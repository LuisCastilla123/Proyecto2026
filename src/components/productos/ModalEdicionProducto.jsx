import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalEdicionProducto = ({ mostrarModal, setMostrarModal, productoEditar, setProductoEditar, categorias, actualizarProducto }) => {
  
  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setProductoEditar({ ...productoEditar, [name]: value });
  };

  const handleActualizar = (e) => {
    e.preventDefault();
    actualizarProducto();
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} backdrop="static" keyboard={false} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-warning">Modificar Producto</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleActualizar}>
        <Modal.Body className="text-start">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre_producto" value={productoEditar.nombre_producto || ""} onChange={manejoCambioInput} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select name="id_categoria" value={productoEditar.id_categoria || ""} onChange={manejoCambioInput} required>
                  <option value="">Selecciona una...</option>
                  {categorias.map((cat) => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre_categoria}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={2} name="descripcion_producto" value={productoEditar.descripcion_producto || ""} onChange={manejoCambioInput} />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio (C$)</Form.Label>
                <Form.Control type="number" step="0.01" name="precio" value={productoEditar.precio || ""} onChange={manejoCambioInput} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" name="stock" value={productoEditar.stock || ""} onChange={manejoCambioInput} required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-2">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control type="url" name="imagen_url" value={productoEditar.imagen_url || ""} onChange={manejoCambioInput} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
          <Button variant="primary" type="submit">Guardar Cambios</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalEdicionProducto;