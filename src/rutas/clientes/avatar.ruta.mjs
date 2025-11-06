import { Router } from "express";
import { autenticar } from "../../middlewares/auth.middleware.mjs";
import { cambiar } from "../../controladores/clientes/avatar.controlador.mjs";
import { upload } from "../../config/multer.config.mjs";

const router = Router();

router.post("/", autenticar, upload.single("avatar"), cambiar);

export { router as avatarRutas };