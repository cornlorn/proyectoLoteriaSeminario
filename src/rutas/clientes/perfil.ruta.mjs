import { Router } from "express";
import { autenticar } from "../../middlewares/auth.middleware.mjs";
import { perfil } from "../../controladores/clientes/perfil.controlador.mjs";

const router = Router();

router.get("/", autenticar, perfil);

export { router as perfilRutas };