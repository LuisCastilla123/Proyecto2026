import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import TarjetasProductos from "../components/productos/TarjetasProductos";

const Productos = () => {

  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });


  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

 
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);

  const cargarCategorias = async () => {
    const { data } = await supabase.from("categorias").select("*");
    setCategorias(data || []);
  };

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("id_producto", { ascending: true });
      if (error) throw error;
      setProductos(data || []);
      setProductosFiltrados(data || []);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    } finally {
      setCargando(false);
    }
  };

  
  const guardarProducto = async (nuevoProducto) => {
    try {
      const { error } = await supabase.from("productos").insert([nuevoProducto]);
      if (error) throw error;
      await cargarProductos(); 
    } catch (err) {
      console.error("Error al guardar producto:", err);
    }
  };


  const eliminarProducto = async () => {
    if (!productoAEliminar) return;
    try {
      setMostrarModalEliminacion(false);
      if (productoAEliminar.url_imagen) {
        const nombreArchivo = productoAEliminar.url_imagen.split("/").pop().split("?")[0];
        await supabase.storage.from("imagenes_productos").remove([nombreArchivo]).catch(() => { });
      }
      const { error } = await supabase
        .from("productos")
        .delete()
        .eq("id_producto", productoAEliminar.id_producto);
      if (error) throw error;
      await cargarProductos();
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminacion(true);
  };

  const abrirModalEdicion = (producto) => { };

  useEffect(() => {
    cargarCategorias();
    cargarProductos();
  }, []);

  return (
    <Container className="mt-5 text-start">
      <Row className="align-items-center mb-4">
        <Col>
          <h2><i className="bi bi-bag-heart-fill text-success me-2"></i> Productos</h2>
          <p className="text-muted">Vista de administración para el inventario de productos.</p>
        </Col>
       
        <Col className="text-end">
          <Button 
            variant="success" 
            onClick={() => setMostrarModalRegistro(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>Agregar Producto
          </Button>
        </Col>
      </Row>

<ModalRegistroProducto
        mostrarModal={mostrarModalRegistro}
        setMostrarModal={setMostrarModalRegistro}
        categorias={categorias}
        guardarProducto={guardarProducto}
      />

      <ModalEliminacionProducto
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        producto={productoAEliminar}
        eliminarProducto={eliminarProducto}
      />
    </Container>
  );
};

export default Productos;