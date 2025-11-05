import { Router } from "express";
import { ingresar } from "../controladores/auth/ingresar.controlador.mjs";
import { validarIngreso } from "../validaciones/auth/ingreso.validacion.mjs";

const router = Router();

router.post("/ingresar", validarIngreso, ingresar);

export { router as authRutas };
