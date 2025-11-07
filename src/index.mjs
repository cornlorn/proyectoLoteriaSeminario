import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import { database } from "./config/database.config.mjs";
import { specs } from "./config/swagger.config.mjs";
import { rutas } from "./rutas/index.ruta.mjs";
import { crearSorteosFuturos, programarSorteosAutomaticos } from "./servicios/sorteo.servicio.mjs";
import { inicializarAdministrador } from "./utils/admin.util.mjs";
import { inicializarJuegos } from "./utils/juego-inicializacion.util.mjs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const { SERVER_PORT } = process.env;

app.use("/api", rutas);
app.use("/profile", express.static("public/profile"));
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use((error, _request, response, _next) => {
  console.error(error);
  const status = error.status || 500;
  const message = error.message || "Error interno del servidor";
  response.status(status).send({ mensaje: message });
});

try {
  await database();

  await inicializarAdministrador();

  await inicializarJuegos();
  await crearSorteosFuturos(3);
  await programarSorteosAutomaticos();

  app.listen(SERVER_PORT, () => {
    console.log(`Servidor iniciado correctamente en: http://localhost:${SERVER_PORT}`);
    console.log(`Documentación API disponible en: http://localhost:${SERVER_PORT}/api/docs`);
  });
} catch (error) {
  console.error("Error al iniciar el servidor:", error);
}
