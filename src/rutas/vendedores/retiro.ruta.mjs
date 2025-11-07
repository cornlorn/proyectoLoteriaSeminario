import { Router } from "express";
import { retirar } from "../../controladores/vendedores/retiro.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import { validarRetirar } from "../../validaciones/vendedores/retiro.validacion.mjs";

const router = Router();

router.post("/", proteger("vendedor"), validarRetirar, retirar);

export { router as retiroRutas };
