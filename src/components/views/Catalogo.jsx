import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Catalogo = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col>
          <h2><i className="bi-images me-2"></i> Catálogo Público</h2>
          <p>Vista de prueba de navegación para el catálogo de productos.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Catalogo;