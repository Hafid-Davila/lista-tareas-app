
# 📝 Lista de Tareas - App de Escritorio

Esta es una aplicación de lista de tareas construida con **React + Flask + Electron**. Funciona completamente **offline** en tu computadora con Windows.

## Tecnologías usadas

- 🔵 React (frontend)
- 🐍 Flask (API REST y servidor)
- ⚡ Vite (empaquetado)
- 🖥️ Electron (para convertirla en app de escritorio)

---

## 🚀 Funcionalidades

- Crear nuevas tareas con fecha de creación automática
- Marcar tareas como completadas y moverlas al final de la lista
- Registrar fecha de modificación y completado
- Editar y eliminar tareas
- API RESTful completa

---

## Instrucciones para correr el proyecto localmente

### 1. Instalar dependencias

```bash
cd frontend
npm install

cd ../backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

---

### 2. Build del frontend

```bash
cd frontend
npm run build
```

---

### 3. Ejecutar Flask (backend)

```bash
cd ../backend
python app.py
```

Accede a la app en `http://localhost:5000`.

---

### 4. Lanzar como app de escritorio

```bash
cd ../frontend
npm run start:electron
```

Esto abrirá una ventana de escritorio con la app funcionando offline. 

## 📚 Créditos

Creado por Hafid Davila como parte de su formación en desarrollo de software.
