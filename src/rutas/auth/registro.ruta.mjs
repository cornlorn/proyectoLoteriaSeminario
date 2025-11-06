import { Router } from "express";
import { registrar } from "../../controladores/auth/registro.controlador.mjs";
import { validarRegistrar } from "../../validaciones/auth/registro.validacion.mjs";

const router = Router();

router.post("/", validarRegistrar, registrar);

export { router as registroRutas };
