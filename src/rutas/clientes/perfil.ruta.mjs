import { Router } from "express";
import { perfil } from "../../controladores/clientes/perfil.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";

const router = Router();

router.get("/", proteger(), perfil);

export { router as perfilRutas };
