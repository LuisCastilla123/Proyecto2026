import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";
import ModalRegistroCategoria from "../components/categorias/ModalRegistroCategoria";
import NotificacionOperacion from "../components/NotificacionOperacion";
import TablaCategorias from "../components/categorias/TablaCategorias";
import TarjetaCategoria from "../components/categorias/TarjetaCategoria";

const Categorias = () => {
  // Variables de estado generales
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });

  // Variables para la estructura del formulario e inserciones
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  // Variables de estado para Modales Auxiliares (Edición y Eliminación)
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [categoriaEditar, setCategoriaEditar] = useState({
    id_categoria: "",
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  // Métodos para el control de apertura de modales auxiliares
  const abrirModalEdicion = (categoria) => {
    setCategoriaEditar({
      id_categoria: categoria.id_categoria,
      nombre_categoria: categoria.nombre_categoria,
      descripcion_categoria: categoria.descripcion_categoria,
    });
    setMostrarModalEdicion(true);
  };

  const abrirModalEliminacion = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminacion(true);
  };

  // Manejador del cambio de valores en inputs
  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Método asíncrono para leer las categorías guardadas en Supabase
  const cargarCategorias = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .order("id_categoria", { ascending: true });

      if (error) {
        console.error("Error al cargar categorías:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al cargar categorías.",
          tipo: "error",
        });
        return;
      }
      setCategorias(data || []);
    } catch (err) {
      console.error("Excepción al cargar categorías:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al cargar categorías.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  // Método asíncrono declarativo para insertar datos en Supabase
  const agregarCategoria = async () => {
    try {
      if (
        !nuevaCategoria.nombre_categoria.trim() ||
        !nuevaCategoria.descripcion_categoria.trim()
      ) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar todos los campos.",
          tipo: "advertencia",
        });
        return;
      }

      const { error } = await supabase.from("categorias").insert([
        {
          nombre_categoria: nuevaCategoria.nombre_categoria,
          descripcion_categoria: nuevaCategoria.descripcion_categoria,
        },
      ]);

      if (error) {
        console.error("Error al agregar categoría:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al registrar categoría.",
          tipo: "error",
        });
        return;
      }

      setToast({
        mostrar: true,
        mensaje: `Categoría "${nuevaCategoria.nombre_categoria}" registrada exitosamente.`,
        tipo: "exito",
      });

      // Limpiar formulario, recargar registros en tiempo real y cerrar modal
      setNuevaCategoria({ nombre_categoria: "", descripcion_categoria: "" });
      await cargarCategorias();
      setMostrarModal(false);
    } catch (err) {
      console.error("Excepción al agregar categoría:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al registrar categoría.",
        tipo: "error",
      });
    }
  };

  // Ejecución automática al montar la vista
  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <Container className="mt-3">
      {/* Título y botón Nueva Categoría */}
      <Row className="align-items-center mb-3">
        <Col xs={9} sm={7} md={7} lg={7} className="d-flex align-items-center">
          <h3 className="mb-0">
            <i className="bi bi-bookmark-plus-fill me-2"></i> Categorías
          </h3>
        </Col>
        <Col xs={3} sm={5} md={5} lg={5} className="text-end">
          <Button variant="primary" onClick={() => setMostrarModal(true)} size="md">
            <i className="bi bi-plus-lg"></i>
            <span className="d-none d-sm-inline ms-2">Nueva Categoría</span>
          </Button>
        </Col>
      </Row>

      <hr />

      {/* Spinner mientras se cargan las categorías */}
      {cargando && (
        <Row className="text-center my-5">
          <Col>
            <Spinner animation="border" variant="success" size="lg" />
            <p className="mt-3 text-muted">Cargando categorías...</p>
          </Col>
        </Row>
      )}

      {/* Bloques condicionales adaptativos para renderizar la UI responsiva */}
      {!cargando && categorias.length > 0 && (
        <Row>
          {/* Se muestra únicamente en pantallas de escritorio grandes (Grandes e idénticas a lg) */}
          <Col lg={12} className="d-none d-lg-block">
            <TablaCategorias
              categorias={categorias}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
            />
          </Col>

          {/* Se muestra únicamente en pantallas móviles pequeñas (Menores que lg) */}
          <Col xs={12} sm={12} md={12} className="d-lg-none">
            <TarjetaCategoria
              categorias={categorias}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
            />
          </Col>
        </Row>
      )}

      {/* Modales e Interfaces Emergentes de Control */}
      <ModalRegistroCategoria
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCategoria={nuevaCategoria}
        manejoCambioInput={manejoCambioInput}
        agregarCategoria={agregarCategoria}
      />

      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mostrar: false })}
      />
    </Container>
  );
};

export default Categorias;