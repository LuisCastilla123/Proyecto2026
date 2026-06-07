import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Productos = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col>
          <h2><i className="bi-bag-heart-fill me-2"></i> Productos</h2>
          <p>Vista de prueba de navegación para la administración de productos.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Productos;