import { Router } from "express";
import { ingresar } from "../controladores/usuarios/ingresar.controlador.mjs";
import { verificarCorreo } from "../controladores/usuarios/verificar-correo.controlador.mjs";
import { validarIngreso } from "../validaciones/usuarios/ingreso.validacion.mjs";
import { validarVerificacionCorreo } from "../validaciones/usuarios/verificar-correo.validacion.mjs";

const router = Router();

router.post("/ingresar", validarIngreso, ingresar);

router.post("/verificar-correo", validarVerificacionCorreo, verificarCorreo);

export { router as usuariosRutas };
