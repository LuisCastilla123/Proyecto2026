import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const FormularioRegistroProducto = ({ guardarProducto, categorias }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      nombre_producto: nombre,
      descripcion_producto: descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      id_categoria: idCategoria ? parseInt(idCategoria) : null,
      imagen_url: imagenUrl
    };
    guardarProducto(nuevoProducto);
    
    // Limpiar formulario
    setNombre(""); setDescripcion(""); setPrecio(""); setStock(""); setIdCategoria(""); setImagenUrl("");
  };

  return (
    <Card className="shadow-sm border-0 p-4 text-start">
      <Card.Body>
        <h4 className="fw-bold mb-4 text-success">Registrar Nuevo Producto</h4>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Computadora Dell" required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} required>
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre_categoria}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={2} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Agrega detalles del producto..." />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio (C$)</Form.Label>
                <Form.Control type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="0.00" required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock (Inventario)</Form.Label>
                <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>URL de la Imagen (Opcional)</Form.Label>
            <Form.Control type="url" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} placeholder="https://ejemplo.com/imagen.png" />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 fw-semibold">
            <i className="bi bi-plus-circle me-2"></i>Guardar Producto
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormularioRegistroProducto;