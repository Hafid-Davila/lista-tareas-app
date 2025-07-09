import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(ordenarTareas(data)));
  }, []);

  const ordenarTareas = (lista) => {
    const pendientes = lista.filter((t) => !t.completed);
    const completadas = lista.filter((t) => t.completed);
    return [...pendientes, ...completadas];
  };

  const crearTarea = () => {
    if (!newTask.trim()) return;

    fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newTask })
    })
      .then((res) => res.json())
      .then((task) => {
        setTasks((prev) => ordenarTareas([...prev, task]));
        setNewTask("");
      });
  };

  const toggleTarea = (task) => {
    fetch(`/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed })
    })
      .then((res) => res.json())
      .then((updated) => {
        const actualizadas = tasks.map((t) =>
          t.id === updated.id ? updated : t
        );
        setTasks(ordenarTareas(actualizadas));
      });
  };

  const eliminarTarea = (task) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres borrar esta tarea?");
    if (!confirmacion) return;

    fetch(`/tasks/${task.id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => {
        const restantes = tasks.filter((t) => t.id !== task.id);
        setTasks(ordenarTareas(restantes));
      });
  };

  const startEditing = (task) => {
    setEditTaskId(task.id);
    setEditDescription(task.description);
  };

  const guardarEdicion = (task) => {
    fetch(`/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: editDescription })
    })
      .then((res) => res.json())
      .then((updated) => {
        const actualizadas = tasks.map((t) =>
          t.id === updated.id ? updated : t
        );
        setTasks(ordenarTareas(actualizadas));
        setEditTaskId(null);
        setEditDescription("");
      });
  };

  return (
    <div className="App">
      <div className="contenedor">
        <h1>Lista de Tareas</h1>
        <div className="form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nueva tarea"
          />
          <button onClick={crearTarea}>Agregar</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "done" : ""}>
              {editTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button onClick={() => guardarEdicion(task)}>Guardar</button>
                </>
              ) : (
                <span onDoubleClick={() => startEditing(task)}>
                  {task.description}
                </span>
              )}
              <div className="timestamps">
                <small>Creada: {new Date(task.created_at).toLocaleString()}</small><br />
                <small>Última mod: {new Date(task.updated_at).toLocaleString()}</small>
              </div>
              <div className="acciones">
                <button id="completed" onClick={() => toggleTarea(task)}>
                  {task.completed ? "Marcar como pendiente" : "Marcar como completada"}
                </button>
                <button id="delete" onClick={() => eliminarTarea(task)} style={{ marginLeft: "8px" }}>
                  🗑 Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
