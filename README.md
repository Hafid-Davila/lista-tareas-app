# 📝 Lista de Tareas - App de Escritorio (React + Flask + SQLite)

Una aplicación local para gestionar tareas, construida como proyecto de aprendizaje usando **React** para el frontend, **Flask** para el backend, y **SQLite** como base de datos local.

---

## 📦 Tecnologías utilizadas

- **Frontend:** React (Create React App o Vite)
- **Backend:** Python + Flask + Flask-SQLAlchemy
- **Base de datos:** SQLite (archivo local)

---

## 🚀 Funcionalidades

- Crear nuevas tareas con fecha de creación automática
- Marcar tareas como completadas y moverlas al final de la lista
- Registrar fecha de modificación y completado
- Editar y eliminar tareas
- API RESTful completa

---

## 🗂️ Estructura del proyecto

```
lista-tareas-app/
├── backend/
│   ├── app.py
│   ├── tasks.db
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   └── ...
└── README.md
```

---

## 🔧 Cómo ejecutar el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/lista-tareas-app.git
cd lista-tareas-app
```

### 2. Backend (Flask)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # En Windows
pip install -r requirements.txt
python app.py
```

El backend se ejecutará en: `http://127.0.0.1:5000`

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev    # o npm start si usas CRA
```

El frontend se ejecutará en: `http://localhost:5173` (o el puerto que indique Vite)

---

## 📁 Archivo `.gitignore`

Asegúrate de incluir lo siguiente para mantener tu repo seguro y limpio:

```
# Python
venv/
tasks.db
__pycache__/

# Node
node_modules/
dist/
build/

# Editor
.vscode/
.DS_Store
```


## 📚 Créditos

Creado por Hafid Davila como parte de su formación en desarrollo de software.
