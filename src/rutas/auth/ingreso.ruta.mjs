import { Router } from "express";
import { ingresar } from "../../controladores/auth/ingreso.controlador.mjs";
import { validarIngresar } from "../../validaciones/auth/ingreso.validacion.mjs";

const router = Router();

router.post("/", validarIngresar, ingresar);

export { router as ingresoRutas };
