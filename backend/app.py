from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(
    __name__,
    static_folder="../frontend/dist",  # Carpeta donde Vite guarda el build
    static_url_path=""
)

# Configuración base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

# Ruta para servir React (index.html)
@app.route("/")
def serve_react():
    return send_from_directory(app.static_folder, "index.html")


# Modelo de datos
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.String(100), default=lambda: current_time())
    updated_at = db.Column(db.String(100), default=lambda: current_time())
    completed_at = db.Column(db.String(100), nullable=True)
    completed = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'completed_at': self.completed_at,
            'completed': self.completed
        }


# Helper para obtener timestamp actual 
def current_time():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


# Crear la base de datos (solo se hace una vez)
with app.app_context():
    db.create_all()


# Rutas API
@app.route("/task", methods=["GET"])
def get_task():
    tasks = Task.query.order_by(Task.completed.asc()).all()
    return jsonify([t.to_dict() for t in tasks])

# Ruta para crear una nueva tarea
@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    task = Task(
        description=data.get("description", ""),
        created_at=current_time(),
        updated_at=current_time()
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

# Ruta para actualizar una tarea (marcar completada, editar descripción, etc.)
@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    data = request.get_json()
    if "description" in data:
        task.description = data["description"]
    if "completed" in data:
        task.completed = data["completed"]
        task.completed_at = current_time() if data["completed"] else None
    task.updated_at = current_time()

    db.session.commit()
    return jsonify(task.to_dict())

# Ruta para eliminar una tarea
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"mensaje": "Tarea eliminada"})

if __name__ == "__main__":
    app.run(debug=True)


