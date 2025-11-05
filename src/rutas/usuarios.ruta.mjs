import { Router } from "express";
import { ingresar } from "../controladores/usuarios/ingresar.controlador.mjs";
import { validarIngreso } from "../validaciones/usuarios/ingreso.validacion.mjs";

const router = Router();

router.post("/ingresar", validarIngreso, ingresar);

export { router as usuariosRutas };
