import React from "react";
import { Card, Col, Row, Button, Badge } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TarjetaCatalogo = ({ productos }) => {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {productos && productos.length > 0 ? (
        productos.map((producto) => (
          <Col key={producto.id_producto}>
            <Card className="h-100 border-0 shadow-sm rounded-3 de-foco-tarjeta">
              {/* Imagen del Producto */}
              <div 
                className="bg-light d-flex align-items-center justify-content-center rounded-top" 
                style={{ height: "180px", overflow: "hidden" }}
              >
                {producto.imagen_url ? (
                  <img
                    src={producto.imagen_url}
                    alt={producto.nombre_producto}
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <i className="bi bi-box-seam text-muted fs-1"></i>
                )}
              </div>

              {/* Cuerpo de la Tarjeta */}
              <Card.Body className="d-flex flex-column text-start">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="fw-bold fs-6 mb-0 text-truncate" style={{ maxWidth: "70%" }}>
                    {producto.nombre_producto}
                  </Card.Title>
                  <Badge bg={producto.stock > 0 ? "success" : "danger"}>
                    {producto.stock > 0 ? "Disponible" : "Agotado"}
                  </Badge>
                </div>

                <Card.Text className="small text-muted text-truncate-2-lines mb-3 flex-grow-1">
                  {producto.descripcion_producto || "Sin descripción disponible."}
                </Card.Text>

                {/* Precio y Botón de Acción */}
                <div className="d-flex align-items-center justify-content-between mt-autopt-2 border-top">
                  <span className="fw-bold text-success fs-5">
                    C$ {parseFloat(producto.precio).toFixed(2)}
                  </span>
                  <Button 
                    variant="primary" 
                    size="sm"
                    disabled={producto.stock <= 0}
                  >
                    <i className="bi bi-cart-plus me-1"></i> Comprar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col xs={12} className="text-center text-muted py-5">
          <i className="bi bi-folder-x fs-1 d-block mb-2"></i>
          <h5>No hay productos disponibles en el catálogo.</h5>
        </Col>
      )}
    </Row>
  );
};

export default TarjetaCatalogo;