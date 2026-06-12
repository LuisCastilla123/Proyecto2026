import React from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";


const TarjetasProductos = ({ productos, abrirModalEdicion, abrirModalEliminacion }) => {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {productos.map((producto) => (
        <Col key={producto.id_producto}>
          <Card className="h-100 border-0 shadow-sm text-start">         
            <Card.Body>              
              <div className="d-flex gap-2 justify-content-end border-top pt-2">             
                <Button 
                  variant="outline-warning" 
                  size="sm" 
                  onClick={() => abrirModalEdicion(producto)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>

                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => abrirModalEliminacion(producto)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TarjetasProductos;