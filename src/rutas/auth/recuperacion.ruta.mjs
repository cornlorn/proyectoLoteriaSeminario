import { Router } from "express";
import { solicitarRecuperacion } from "../../controladores/usuarios/solicitar-recuperacion.controlador.mjs";
import { restablecerContrasena } from "../../controladores/usuarios/restablecer-contrasena.controlador.mjs";
import { validarSolicitudRecuperacion } from "../../validaciones/usuarios/solicitar-recuperacion.validacion.mjs";
import { validarRestablecimientoContrasena } from "../../validaciones/usuarios/restablecer-contrasena.validacion.mjs";

const router = Router();

router.post("/solicitar", validarSolicitudRecuperacion, solicitarRecuperacion);
router.post("/reenviar", validarReenviarToken, reenviarToken);
router.post("/restablecer", validarRestablecimientoContrasena, restablecerContrasena);

export { router as recuperacionRutas };
