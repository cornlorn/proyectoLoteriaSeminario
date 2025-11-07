import { Router } from "express";
import { upload } from "../../config/multer.config.mjs";
import { cambiar, eliminar } from "../../controladores/clientes/avatar.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";

const router = Router();

router.post("/", proteger("cliente"), upload.single("avatar"), cambiar);
router.delete("/", proteger("cliente"), eliminar);

export { router as avatarRutas };
