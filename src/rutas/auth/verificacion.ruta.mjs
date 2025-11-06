import { Router } from "express";
import { reenviar, verificar } from "../../controladores/auth/verificacion.controlador.mjs";
import { autenticar } from "../../middlewares/auth.middleware.mjs";
import { validarVerificar } from "../../validaciones/auth/verificacion.validacion.mjs";

const router = Router();

router.post("/verificar", autenticar, validarVerificar, verificar);
router.post("/reenviar", autenticar, reenviar);

export { router as verificacionRutas };
