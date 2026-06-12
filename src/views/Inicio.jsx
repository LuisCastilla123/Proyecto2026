import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Inicio = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col>
          <h2><i className="bi-house-fill me-2"></i>Inicio</h2>
          <p>Vista de prueba de navegación.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Inicio;