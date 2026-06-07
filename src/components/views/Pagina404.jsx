import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Pagina404 = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center text-center">
        <Col>
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <h2><i className="bi-exclamation-triangle-fill me-2"></i> Página No Encontrada</h2>
          <p>La ruta a la que intentas acceder no existe en el sistema Discosa.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Pagina404;