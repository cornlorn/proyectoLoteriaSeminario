import { Router } from "express";
import { ingresar } from "../controladores/usuarios/ingresar.controlador.mjs";
import { reenviarToken } from "../controladores/usuarios/reenviar-codigo.controlador.mjs";
import { verificarCorreo } from "../controladores/usuarios/verificar-correo.controlador.mjs";
import { validarIngreso } from "../validaciones/usuarios/ingreso.validacion.mjs";
import { validarReenviarToken } from "../validaciones/usuarios/reenviar-token.validacion.mjs";
import { validarVerificacionCorreo } from "../validaciones/usuarios/verificar-correo.validacion.mjs";

const router = Router();

router.post("/ingresar", validarIngreso, ingresar);

router.post("/verificar-correo", validarVerificacionCorreo, verificarCorreo);

router.post("/reenviar-codigo", validarReenviarToken, reenviarToken);

export { router as usuariosRutas };
