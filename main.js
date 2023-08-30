const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 4000;
const Version = " 1.0.0";

const pool = new Pool({
  user: "bwunnmjm",
  host: "baasu.db.elephantsql.com",
  database: "bwunnmjm",
  password: "yLZKnrpsGYcrMA0Dk-EEVzvNMIsLXK1c",
  port: "5432",
});

// Modelo
class Model {
  async getUsuario() {
    const { rows } = await pool.query("select * from usuarios order by id;");
    return rows;
  }

  async getUsuarioById(id) {
    const { rows } = await pool.query("select * from usuarios where id = $1;", [id]);
    return rows[0];
  }

  async getPromedioEdadUsuario() {
    const { rows } = await pool.query("select AVG(EXTRACT(YEAR FROM AGE(NOW(),fecha_nacimiento))) AS promedio_edades from usuarios u;");
    return rows;
  }

  async deleteUsuario(id) {
    await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
  }
  
 
  async addUsuario(nombre, apellido1, apellido2, cedula, fecha_nacimiento) {
    await pool.query("INSERT INTO public.usuarios (nombre, primer_apellido, segundo_apellido, cedula_identidad, fecha_nacimiento, estado, fecha_reg) VALUES($1 , $2, $3, $4, TO_DATE($5, 'YYYY-MM-DD'), 1, NOW())", [nombre, apellido1, apellido2, cedula, fecha_nacimiento]);
  }

 
  async updateUsuario(id, nombre, apellido1, apellido2, cedula, fecha_nacimiento) {
    await pool.query("UPDATE usuarios SET nombre = $1, primer_apellido= $3, segundo_apellido=$4, cedula_identidad=$5, fecha_nacimiento= TO_DATE($6, 'YYYY-MM-DD'), fecha_mod = NOW() WHERE id = $2", [nombre, id, apellido1, apellido2, cedula, fecha_nacimiento]);
  }

}

//Controlador
class Controller {
  constructor(model) {
    this.model = model;
  }
  async getMain(req, res) {
    const data = '<h1> API - REST:: USUARIOS - PROYECTO FINAL</h1>';
    res.send(data);
  }

  async getUsuario(req, res) {
    const data = await this.model.getUsuario();
    res.send(data);
  }

  async getUsuarioById(req, res) {
    const id = req.params.id;
    const data = await this.model.getUsuarioById(id);
    res.send(data);
  }

  async getpromedioEdadUsuario(req, res) {
    const data = await this.model.getPromedioEdadUsuario();
    res.send(data);
  }

  async getEstado(req, res) {
    const data = "Version: "+Version;
    res.send(data);
  }

  async deleteUsuario(req, res) {
    const id = req.params.id;
    await this.model.deleteUsuario(id);
    res.sendStatus(200);
  }

  async addUsuario(req, res) {
    const nombre = req.body.nombre;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2; 
    const cedula = req.body.cedula; 
    const fecha_nacimiento = req.body.fecha_nacimiento;
    await this.model.addUsuario(nombre, apellido1, apellido2,cedula, fecha_nacimiento);
    res.sendStatus(201);
  }

  async updateUsuario(req, res) {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2; 
    const cedula = req.body.cedula; 
    const fecha_nacimiento = req.body.fecha_nacimiento;
    await this.model.updateUsuario(id, nombre, apellido1, apellido2,cedula, fecha_nacimiento);
    res.sendStatus(200);
  }

}

//Instanciación
const model = new Model();
const controller = new Controller(model);

app.use(express.json());

app.get("/", controller.getMain.bind(controller));
app.get("/usuarios", controller.getUsuario.bind(controller));
app.get("/usuarios/:id", controller.getUsuarioById.bind(controller));
app.get("/promedio-edad", controller.getpromedioEdadUsuario.bind(controller));
app.get("/estado", controller.getEstado.bind(controller));
app.post("/usuarios", controller.addUsuario.bind(controller));
app.put("/usuarios/:id", controller.updateUsuario.bind(controller));
app.delete("/usuarios/:id", controller.deleteUsuario.bind(controller));

app.listen(port, () => {
  console.log(`Este servidor se ejecuta en http://localhost:${port}`);
});
