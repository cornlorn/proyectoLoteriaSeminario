import { Router } from "express";
import { depositar } from "../../controladores/vendedores/deposito.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import { validarDepositar } from "../../validaciones/vendedores/deposito.validacion.mjs";

const router = Router();

router.post("/", proteger("vendedor"), validarDepositar, depositar);

export { router as depositoRutas };
