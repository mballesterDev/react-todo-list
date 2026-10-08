import React from 'react'

const Todo = ({id, desc, completado, eliminarTodo, toggleCompletado}) => {
  return (
    <div className='flex gap-3'>
      <span style={{ textDecoration: completado ? 'line-through' : 'none' }}>
        {desc}
      </span>
      <input 
        type='checkbox'
        checked={completado}
        onChange={() => toggleCompletado(id)}  // ✅ Ejecuta la función del padre
      />
      <button onClick={() => eliminarTodo(id)}>Eliminar</button>
    </div>
  )
}

export default Todo