import React, { useState, useEffect } from "react";
import { isEmpty, size } from "lodash";

import './style.css'
import { addDocument, deleteDocument, getCollection, updateDocument } from "../actions/actions";

export default function Tasks() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks");

      result.statusResponse && setTasks(result.data);
    })();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    if (isEmpty(task)) {
      alert("Task Empty");
      return;
    }

    const result = await addDocument("tasks", { name: task });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    setTasks([...tasks, { id: result.data.id, name: task }]);
    // console.log(newTask)
    setTask("");
  };

  const saveTask = async(e) => {
    e.preventDefault();

    if (isEmpty(task)) {
      alert("Task Empty");
      return;
    }

    const result = await updateDocument("tasks", id, { name: task })
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    const editedTask = tasks.map((item) =>
      item.id === id ? { id, name: task } : item
    );
    setTasks(editedTask);
    setEditMode(false);
    setTask("");
    setId("");
  };

  const deleteTask = async(id) => {
    const result = await deleteDocument("tasks", id)

    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
  };

  const editTask = (theTask) => {
    setTask(theTask.name);
    setEditMode(true);
    setId(theTask.id);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center">Tareas</h1>
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
                    <button
                      className="btn btn-danger btn-sm float-end mx-2"
                      onClick={() => {
                        editTask(task);
                      }}
                    >
                      Editar
                    </button>
                  </li>
                ))
              }
            </ul>
          )}
        </div>
        <div className="col-md-4 col-sm-12">
          <h4>{editMode ? "Modificar tarea" : "Agregar Tareas"}</h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            <textarea
              type="input"
              placeholder="Ingrese tarea..."
              className="form-control input-task"
              onChange={(text) => {
                setTask(text.target.value);
              }}
              value={task}
            />
            <button
              className={
                editMode
                  ? "btn btn-warning w-100 mt-2"
                  : "btn btn-dark w-100 mt-2"
              }
              type="submit"
            >
              {editMode ? "Guardar Tarea" : "Agregar Tarea"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
