import { Router } from "express";
import { cambiarContrasena } from "../../controladores/clientes/cambiar-contrasena.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import { validarCambiarContrasena } from "../../validaciones/clientes/cambiar-contrasena.validacion.mjs";

const router = Router();

router.put("/", proteger(), validarCambiarContrasena, cambiarContrasena);

export { router as cambiarContrasenaRutas };
