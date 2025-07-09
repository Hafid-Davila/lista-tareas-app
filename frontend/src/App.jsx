// Paso 4.c - Verificación de cambios en App.jsx

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => {
        const ordenadas = ordenarTareas(data);
        setTasks(ordenadas);
      });
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
      body: JSON.stringify({ description: newTask }),
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
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then((res) => res.json())
      .then((updated) => {
        const actualizadas = tasks.map((t) =>
          t.id === updated.id ? updated : t
        );
        setTasks(ordenarTareas(actualizadas));
      });
  };

  return (
    <div className="App">
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
          <li
            key={task.id}
            className={task.completed ? "done" : ""}
            onClick={() => toggleTarea(task)}
          >
            {task.description}
            <small>{task.completed ? "Completada" : "Pendiente"}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
