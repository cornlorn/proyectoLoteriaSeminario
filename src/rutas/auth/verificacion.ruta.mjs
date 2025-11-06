import { Router } from "express";
import { reenviarToken } from "../../controladores/usuarios/reenviar-codigo.controlador.mjs";
import { verificarCorreo } from "../../controladores/usuarios/verificar-correo.controlador.mjs";
import { validarReenviarToken } from "../../validaciones/usuarios/reenviar-token.validacion.mjs";
import { validarVerificacionCorreo } from "../../validaciones/usuarios/verificar-correo.validacion.mjs";

const router = Router();

router.post("/verificar", validarVerificacionCorreo, verificarCorreo);
router.post("/reenviar", validarReenviarToken, reenviarToken);

export { router as verificacionRutas };
