import { Router } from "express";
import { ingresar } from "../../controladores/usuarios/ingresar.controlador.mjs";
import { validarIngreso } from "../../validaciones/usuarios/ingreso.validacion.mjs";

const router = Router();

router.post("/", validarIngreso, ingresar);

export { router as sesionRutas };
