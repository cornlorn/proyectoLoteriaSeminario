import { Router } from "express";
import { depositar } from "../../controladores/vendedores/deposito.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";

const router = Router();

router.post("/", proteger("vendedor"), depositar);

export { router as depositoRutas };
