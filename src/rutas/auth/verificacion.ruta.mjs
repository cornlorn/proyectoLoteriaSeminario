import { Router } from "express";
import { reenviar, verificar } from "../../controladores/auth/verificacion.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import { validarVerificar } from "../../validaciones/auth/verificacion.validacion.mjs";

const router = Router();

router.post("/verificar", proteger(), validarVerificar, verificar);
router.post("/reenviar", proteger(), reenviar);

export { router as verificacionRutas };
