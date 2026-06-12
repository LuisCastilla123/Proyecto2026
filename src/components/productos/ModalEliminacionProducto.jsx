import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEliminacionProducto = ({ mostrarModal, setMostrarModal, productoEliminar, eliminarProducto }) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-danger">⚠️ Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <p>¿Estás completamente seguro de que deseas eliminar el producto <strong>{productoEliminar?.nombre_producto}</strong>?</p>
        <p className="text-muted small">Esta acción no se puede deshacer y se borrará permanentemente del inventario.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
        <Button variant="danger" onClick={eliminarProducto}>Eliminar Definitivamente</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionProducto;