import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Categorias = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col>
          <h2><i className="bi-bookmark-fill me-2"></i> Categorías</h2>
          <p>Vista de prueba de navegación para la administración de categorías.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Categorias;