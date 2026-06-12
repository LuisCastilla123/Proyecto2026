import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TarjetaCategoria = ({ categorias, abrirModalEdicion, abrirModalEliminacion }) => {
  return (
    <>
      {categorias && categorias.length > 0 ? (
        <Row xs={1} sm={2} className="g-3 d-md-none"> 
          {/* Se muestra solo en pantallas móviles (d-md-none) */}
          {categorias.map((categoria) => (
            <Col key={categoria.id_categoria}>
              <Card className="border-0 rounded-3 shadow-sm h-100">
                <Card.Body className="p-3">
                  <Row className="align-items-center">
                    <Col xs={3} className="text-center">
                      <div className="bg-light d-flex align-items-center justify-content-center rounded p-2" style={{ height: "50px", width: "50px" }}>
                        <i className="bi bi-bookmark text-success fs-3"></i>
                      </div>
                    </Col>
                    <Col xs={9}>
                      <h6 className="fw-bold mb-1 text-truncate">
                        {categoria.nombre_categoria}
                      </h6>
                      <p className="small text-muted mb-0 text-truncate">
                        {categoria.descripcion_categoria || "Sin descripción"}
                      </p>
                    </Col>
                  </Row>
                  <hr className="my-2 text-muted" />
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => abrirModalEdicion(categoria)}
                    >
                      <i className="bi bi-pencil me-1"></i> Editar
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => abrirModalEliminacion(categoria)}
                    >
                      <i className="bi bi-trash me-1"></i> Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center text-muted py-3 d-md-none">
          No hay categorías registradas aún.
        </div>
      )}
    </>
  );
};

export default TarjetaCategoria;