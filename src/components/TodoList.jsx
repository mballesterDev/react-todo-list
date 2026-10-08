import React, { useEffect, useState } from 'react';
import Todo from './Todo';

const TodoList = () => {

  // ------------------------------------------------------------------
  // CARGA INICIAL DESDE localStorage
  // ------------------------------------------------------------------

  // ✅ Función que carga los datos guardados en el navegador.
  // Si no hay datos, devuelve un array vacío para evitar errores.
  const getInitialData = () => {
    const data = localStorage.getItem("listaStorage");
    if (data) {
      return JSON.parse(data); // Si hay datos, los convierte de JSON a array
    }
    return []; // Si no hay datos, empieza con lista vacía
  }

  // ------------------------------------------------------------------
  // ESTADOS
  // ------------------------------------------------------------------

  // 📌 listaTodos: contiene TODAS las tareas (fuente de verdad)
  const [listaTodos, setListaTodos] = useState(getInitialData());

  // 📌 listaFiltrada: contiene SOLO las tareas que coinciden con el filtro actual
  const [listaFiltrada, setListaFiltrada] = useState(listaTodos);

  // 📌 descInput: lo que el usuario escribe en el input
  const [descInput, setDescInput] = useState("");

  // 📌 filtro: estado actual del filtro ("todos", "completas", "pendientes")
  const [filtro, setFiltro] = useState("todos");

  // ------------------------------------------------------------------
  // GUARDAR EN localStorage AUTOMÁTICAMENTE
  // ------------------------------------------------------------------

  // 💾 Cada vez que cambia listaTodos, se guarda automáticamente en localStorage.
  // Así no tenemos que poner localStorage.setItem() en cada función.
  useEffect(() => {
    localStorage.setItem("listaStorage", JSON.stringify(listaTodos));
  }, [listaTodos]);

  // ------------------------------------------------------------------
  // FUNCIONES PARA MODIFICAR TAREAS
  // ------------------------------------------------------------------

  // Añadir tarea
  const anaydirTodo = () => {
    if (descInput.trim() === "") {
      alert("no puede estar vacio");
      return;
    }

    const newListaTodos = [
      ...listaTodos,
      {
        id: Date.now(),
        desc: descInput,
        completado: false,
      },
    ];
    setListaTodos(newListaTodos); // Al cambiar listaTodos, se guarda solo (gracias al useEffect de arriba)
    setDescInput(""); // Limpia el input
  };

  // Eliminar tarea por id
  const eliminarTodo = (id) => {
    const newListaTodos = listaTodos.filter((todo) => todo.id !== id);
    setListaTodos(newListaTodos);
  };

  // Cambiar estado "completado" (marcar/desmarcar)
  const toggleCompletado = (id) => {
    const newListaTodos = listaTodos.map((todo) =>
      todo.id === id ? { ...todo, completado: !todo.completado } : todo
    );
    setListaTodos(newListaTodos);
  };

  // ------------------------------------------------------------------
  // FILTRADO DE TAREAS
  // ------------------------------------------------------------------

  // 🔍 Esta función actualiza listaFiltrada según el filtro seleccionado.
  const obtenerTareasFiltradas = (filtro = "todos") => {
    if (filtro === "todos") {
      setListaFiltrada(listaTodos); // Muestra todas
    } else if (filtro === "completas") {
      const newListaF = listaTodos.filter((todo) => todo.completado === true);
      setListaFiltrada(newListaF); // Muestra solo completadas
    } else {
      // pendientes
      const newListaF = listaTodos.filter((todo) => todo.completado === false);
      setListaFiltrada(newListaF); // Muestra solo pendientes
    }
  };

  // ------------------------------------------------------------------
  // EFECTOS SECUNDARIOS (useEffect)
  // ------------------------------------------------------------------

  // 🔄 Cuando cambia el filtro o la lista de tareas, se vuelve a calcular
  // la lista filtrada. Así siempre está sincronizada.
  useEffect(() => {
    obtenerTareasFiltradas(filtro);
  }, [filtro, listaTodos]);

  // ------------------------------------------------------------------
  // RENDERIZADO (JSX)
  // ------------------------------------------------------------------

  return (
    <div className="mx-auto my-auto">
      {/* INPUT + BOTÓN AÑADIR */}
      <div className="flex gap-3 mb-4">
        <input
          className="p-2 outline-1"
          value={descInput}
          type="text"
          placeholder="Ingresa una tarea"
          onChange={(e) => setDescInput(e.target.value)}
        />
        <button onClick={anaydirTodo} className="cursor-pointer">
          Añadir
        </button>
      </div>

      {/* LISTA DE TAREAS FILTRADAS */}
      <div className="flex flex-col gap-3">
        {/* ✅ Usamos listaFiltrada (siempre actualizada gracias al useEffect) */}
        {/* ✅ El operador ?. (optional chaining) evita errores si listaFiltrada es null/undefined */}
        {listaFiltrada?.map((tarea) => (
          <Todo
            id={tarea.id}
            desc={tarea.desc}
            key={tarea.id}
            eliminarTodo={eliminarTodo}
            completado={tarea.completado}
            toggleCompletado={toggleCompletado}
          />
        ))}
      </div>

      {/* BOTONES DE FILTRO */}
      <div className="flex gap-5 mt-10">
        <button onClick={() => setFiltro("todos")}>Mostrar Todas</button>
        <button onClick={() => setFiltro("completas")}>Mostrar Completas</button>
        <button onClick={() => setFiltro("pendientes")}>Mostrar Incompletas</button>
      </div>
    </div>
  );
};

export default TodoList;