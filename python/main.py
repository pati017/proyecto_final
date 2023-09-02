from flask import Flask, render_template, redirect, request

import datetime, os
import psycopg2

conn = psycopg2.connect(
    host="baasu.db.elephantsql.com",
    database="bwunnmjm",
    user="bwunnmjm",
    password="yLZKnrpsGYcrMA0Dk-EEVzvNMIsLXK1c"
)

print(conn)


# Modelo
class UsuarioModel:
    def __init__(self):
        self.usuarios = []
        

    def add_usuarios(self, nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento):
        self.usuarios.append(nombre)
        self.usuarios.append(primer_apellido)
        self.usuarios.append(segundo_apellido)
        self.usuarios.append(cedula_identidad)
        self.usuarios.append(fecha_nacimiento)


# CREATE TABLE users (
#     id SERIAL PRIMARY KEY,
#     nombre VARCHAR(50) UNIQUE NOT NULL,
#     primer_apellido VARCHAR(50) UNIQUE NOT NULL,
#     segundo_apellido VARCHAR(50) UNIQUE NOT NULL,
#     cedula_identidad VARCHAR(50) UNIQUE NOT NULL,
#     fecha_nacimiento VARCHAR(50) UNIQUE NOT NULL,
# );


    def edit_usuarios(self, index, nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento):
        self.usuarios[index] = nombre
        self.usuarios[index] = primer_apellido
        self.usuarios[index] = segundo_apellido
        self.usuarios[index] = cedula_identidad
        self.usuarios[index] = fecha_nacimiento
        self.usuarios[index] = datetime.datetime.now()

    def delete_usuario(self, index):
        del self.usuarios[index]

# Controlador
class UsuarioController:
    def __init__(self, model):
        self.model = model

    def add_usuarios(self, nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento):
        self.model.add_usuarios(nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento)

    def edit_usuario(self, index, nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento):
        self.model.edit_usuarios(index, nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento)

    def delete_usuario(self, index):
        self.model.delete_usuario(index)

# Vistas
app = Flask(__name__)

app = Flask(__name__, template_folder="views")

@app.route('/')
def index():
    return render_template('index.html', usuarios=usuario_controller.model.usuarios)

@app.route('/add_usuario', methods=['POST'])
def add_usuarios():
    nombre = request.form['nombre']
    primer_apellido = request.form['primer_apellido']
    segundo_apellido = request.form['segundo_apellido']
    cedula_identidad = request.form['cedula_identidad']
    fecha_nacimiento = request.form['fecha_nacimiento']
    usuario_controller.add_usuarios(nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento)
    cur = conn.cursor()
    cur.execute("INSERT INTO usuarios (nombre,primer_apellido,segundo_apellido,cedula_identidad,fecha_nacimiento) VALUES (%s, %s,%s,%s,%s)", (nombre, primer_apellido,segundo_apellido,cedula_identidad,fecha_nacimiento))
    conn.commit()
    return redirect('/')

@app.route('/edit_usuario/<int:index>', methods=['POST'])
def edit_usuario1(index):
    nombre = request.form['nombre']
    primer_apellido = request.form['primer_apellido']
    segundo_apellido = request.form['segundo_apellido']
    cedula_identidad = request.form['cedula_identidad']
    fecha_nacimiento = request.form['fecha_nacimiento']
    usuario_controller.edit_usuario(index, nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento)
    return redirect('/')

@app.route('/delete_usuario/<int:index>', methods=['POST'])
def edit_usuario(index):
    usuario_controller.edit_usuario(index)
    return redirect('/')

usuario_model = UsuarioModel()
usuario_controller = UsuarioController(usuario_model)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8000, debug=True)

