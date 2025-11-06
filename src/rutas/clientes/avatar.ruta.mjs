import { Router } from "express";
import { upload } from "../../config/multer.config.mjs";
import { cambiar, eliminar } from "../../controladores/clientes/avatar.controlador.mjs";
import { autenticar } from "../../middlewares/auth.middleware.mjs";

const router = Router();

router.post("/", autenticar, upload.single("avatar"), cambiar);
router.delete("/", autenticar, eliminar);

export { router as avatarRutas };
