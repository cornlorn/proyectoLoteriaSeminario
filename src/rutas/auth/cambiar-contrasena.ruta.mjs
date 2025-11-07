import { Router } from "express";
import { cambiarContrasena } from "../../controladores/auth/cambiar-contrasena.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import { validarCambiarContrasena } from "../../validaciones/auth/cambiar-contrasena.validacion.mjs";

const router = Router();

router.put("/", proteger(), validarCambiarContrasena, cambiarContrasena);

export { router as cambiarContrasenaRutas };
