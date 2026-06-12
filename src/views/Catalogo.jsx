import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig"; 
import TarjetaCatalogo from "../components/catalogo/TarjetaCatalogo"; 

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);


  const cargarProductosDelCatalogo = async () => {
    try {
      setCargando(true);
  
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("id_producto", { ascending: true });

      if (error) throw error;
      setProductos(data || []);
    } catch (err) {
      console.error("Error al cargar el catálogo:", err);
    } finally {
      setCargando(false);
    }
  };


  useEffect(() => {
    cargarProductosDelCatalogo();
  }, []);

  return (
    <Container className="mt-5 text-start">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-primary">
            <i className="bi bi-shop me-2"></i>Nuestro Catálogo
          </h2>
          <p className="text-muted">
            Explora los productos disponibles en nuestra plataforma en tiempo real.
          </p>
        </Col>
      </Row>

   
      {cargando ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <h5 className="mt-2 text-muted">Sincronizando vitrina...</h5>
        </div>
      ) : (
   
        <TarjetaCatalogo productos={productos} />
      )}
    </Container>
  );
};

export default Catalogo;