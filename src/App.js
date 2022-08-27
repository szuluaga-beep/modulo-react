import React, { useState } from "react";

import { isEmpty } from "lodash";
import "./styles/style.css";
export default function App() {
  const [task, setTask] = useState("")
  const addTask = (e) => {
    e.preventDefault()
    
    if (isEmpty(task)) {
      alert('Task Empty')
      return
    }

    console.log(task)
    setTask("")
  }
  return (
    <div className="container mt-5">
      <h1 className="text-primary">Tasks</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="lead">Tarea 1</span>
              <button className="btn btn-primary btn-sm float-end ">Eliminar</button>
              <button className="btn btn-danger btn-sm float-end mx-2">Editar</button>
            </li>
            
          </ul>
        </div>
        <div className="col-4">
          <h4>Formulario</h4>
          <form onSubmit={addTask}>
            <input
              type='input'
              placeholder='Ingrese tarea...'
              className='form-control'
              onChange={(text) => {
                setTask(text.target.value)
              }}
              value={task}
            />
            <button className='btn btn-dark w-100 mt-2'
              type="submit"

            >Agregar Tarea</button>
          </form>
        </div>
      </div>
    </div>
  );
}
