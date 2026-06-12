import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalRegistroProducto = ({ mostrarModal, setMostrarModal, categorias, guardarProducto }) => {
  const [producto, setProducto] = useState({
    nombre_producto: "", descripcion_producto: "", precio: "", stock: "", id_categoria: "", imagen_url: ""
  });

  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    guardarProducto({
      ...producto,
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock),
      id_categoria: producto.id_categoria ? parseInt(producto.id_categoria) : null
    });
    setProducto({ nombre_producto: "", descripcion_producto: "", precio: "", stock: "", id_categoria: "", imagen_url: "" });
    setMostrarModal(false);
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} backdrop="static" keyboard={false} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-success">Agregar Producto</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleGuardar}>
        <Modal.Body className="text-start">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre_producto" value={producto.nombre_producto} onChange={manejoCambioInput} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select name="id_categoria" value={producto.id_categoria} onChange={manejoCambioInput} required>
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
            <Form.Control as="textarea" rows={2} name="descripcion_producto" value={producto.descripcion_producto} onChange={manejoCambioInput} />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio (C$)</Form.Label>
                <Form.Control type="number" step="0.01" name="precio" value={producto.precio} onChange={manejoCambioInput} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" name="stock" value={producto.stock} onChange={manejoCambioInput} required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-2">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control type="url" name="imagen_url" value={producto.imagen_url} onChange={manejoCambioInput} placeholder="https://..." />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
          <Button variant="success" type="submit">Guardar Producto</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalRegistroProducto;