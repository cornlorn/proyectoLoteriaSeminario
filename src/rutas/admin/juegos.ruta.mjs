import { Router } from "express";
import { actualizarReglas, obtenerJuegos } from "../../controladores/admin/juegos/juego.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import { validarActualizarReglasJuego } from "../../validaciones/admin/juegos.validacion.mjs";

const router = Router();

router.get("/", proteger("administrador"), obtenerJuegos);
router.put("/:id", proteger("administrador"), validarActualizarReglasJuego, actualizarReglas);

export { router as rutasJuegos };
