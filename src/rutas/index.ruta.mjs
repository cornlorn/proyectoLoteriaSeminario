import { Router } from "express";
import { recuperacionRutas } from "./auth/recuperacion.ruta.mjs";
import { registroRutas } from "./auth/registro.ruta.mjs";
import { sesionRutas } from "./auth/sesion.ruta.mjs";
import { verificacionRutas } from "./auth/verificacion.ruta.mjs";
import { avatarRutas } from "./clientes/avatar.ruta.mjs";
import { perfilRutas } from "./clientes/perfil.ruta.mjs";

const router = Router();

router.use("/auth/ingresar", sesionRutas);
router.use("/auth/registrar", registroRutas);
router.use("/auth/correo", verificacionRutas);
router.use("/auth/recuperacion", recuperacionRutas);

router.use("/clientes/perfil", perfilRutas);
router.use("/clientes/avatar", avatarRutas);

export { router as rutas };
