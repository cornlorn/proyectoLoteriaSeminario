import { Router } from "express";
import { restablecer, solicitar } from "../../controladores/auth/recuperacion.controlador.mjs";
import {
  validarRestablecer,
  validarSolicitar,
} from "../../validaciones/auth/recuperacion.validacion.mjs";

const router = Router();

router.post("/solicitar", validarSolicitar, solicitar);
// router.post("/reenviar", validarReenviarToken, reenviarToken);
router.post("/restablecer", validarRestablecer, restablecer);

export { router as recuperacionRutas };
