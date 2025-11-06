import { Router } from "express";
import {
  reenviar,
  restablecer,
  solicitar,
} from "../../controladores/auth/recuperacion.controlador.mjs";
import {
  validarReenviar,
  validarRestablecer,
  validarSolicitar,
} from "../../validaciones/auth/recuperacion.validacion.mjs";

const router = Router();

router.post("/solicitar", validarSolicitar, solicitar);
router.post("/reenviar", validarReenviar, reenviar);
router.post("/restablecer", validarRestablecer, restablecer);

export { router as recuperacionRutas };
