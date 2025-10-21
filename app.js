// Importamos el framework Express para crear el servidor.
const express = require("express");
// Importamos el módulo 'path' para manejar rutas de archivos.
const path = require("path");
// Importamos nuestro array de mascotas desde el archivo local.
const mascotas = require("./data/mascotas.js");
// Creamos una instancia de la aplicación Express.
const app = express();
// Definimos el puerto en el que se ejecutará el servidor.
const PORT = 3000;

// CONFIGURACIÓN (MIDDLEWARE).
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Ruta principal que renderiza la lista de mascotas.
app.get("/bienvenida", (req, res) => {
  res.render("bienvenida", {
    nombre: "Amante de los Animales",
    mascotas: mascotas,
  });
});

// Ruta GET para mostrar el formulario de la calculadora.
app.get("/calculadora", (req, res) => {
  // Renderizamos la vista 'calculadora' con un resultado inicial nulo.
  res.render("calculadora", { resultado: null });
});

// Ruta POST para procesar el formulario de la calculadora.
app.post("/calculadora", (req, res) => {
  const edadHumana = Number(req.body.edad);
  const edadPerruna = edadHumana * 7;

  res.render("calculadora", {
    resultado: `Si tuvieras ${edadHumana} años humanos, tu edad perruna sería ${edadPerruna} años.`,
  });
});

// Ruta que devuelve un JSON con números impares.
app.get("/json", (req, res) => {
  const impares = [];
  for (let i = 1; i <= 15; i++) {
    if (i % 2 !== 0) {
      impares.push(i);
    }
  }

  res.json(impares);
});

//FORMULARIO

// RUTA GET → Muestra el formulario vacío
// -----------------------------
app.get("/form", (req, res) => {
  res.render("form", {
    nombre: "",
    apellido: "",
    mensaje: "",
  });
});

// -----------------------------
// RUTA POST → Procesa los datos del formulario
// -----------------------------
app.post("/form", (req, res) => {
  // Destructuring directo desde req.body
  let { nombre, apellido, mensaje } = req.body;

  const errores = [];

  // Validaciones
  if (!nombre || nombre.trim().length < 2) {
    errores.push("El nombre tiene que tener mínimo 2 caracteres.");
  }

  // Renderizar de nuevo el formulario con errores o datos ingresados
  if (errores.length > 0) {
    res.render("form", { nombre, apellido, mensaje, errores });
  } else {
    res.send(
      `Formulario recibido correctamente: ${nombre}, ${apellido}, ${mensaje}`
    );
  }
});

//  INICIO DEL SERVIDOR
// Ponemos el servidor a escuchar en el puerto definido.
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT} ✅`);
});
