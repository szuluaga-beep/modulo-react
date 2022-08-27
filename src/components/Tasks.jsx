import React, { useState } from "react";
import { isEmpty, size } from "lodash";
import { nanoid } from "nanoid";

export default function Tasks() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();

    if (isEmpty(task)) {
      alert("Task Empty");
      return;
    }

    const newTask = {
      id: nanoid(10),
      name: task,
    };

    setTasks([...tasks, newTask]);
    // console.log(newTask)
    setTask("");
  };

  const deleteTask = (id) => {
    // console.log(id)
    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center">Tasks</h1>
      <hr />
      <div className="row">
        <div className=" col-md-8 col-sm-12">
          <h4 className="text-center">Lista de tareas</h4>
          {size(tasks) === 0 ? (
            <h4 className="text-center text-danger">No hay tareas</h4>
          ) : (
            <ul className="list-group">
              {
                //nos obviamos el return sin las llaves
                tasks.map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <span className="lead">{task.name}</span>
                    <button
                      className="btn btn-primary btn-sm float-end "
                      onClick={() => {
                        deleteTask(task.id);
                      }}
                    >
                      Eliminar
                    </button>
                    <button className="btn btn-danger btn-sm float-end mx-2">
                      Editar
                    </button>
                  </li>
                ))
              }
            </ul>
          )}
        </div>
        <div className="col-md-4 col-sm-12">
          <h4>Formulario</h4>
          <form onSubmit={addTask}>
            <input
              type="input"
              placeholder="Ingrese tarea..."
              className="form-control"
              onChange={(text) => {
                setTask(text.target.value);
              }}
              value={task}
            />
            <button className="btn btn-dark w-100 mt-2" type="submit">
              Agregar Tarea
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
