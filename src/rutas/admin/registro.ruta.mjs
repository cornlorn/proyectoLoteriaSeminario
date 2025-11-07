import { Router } from "express";
import { registrar as registrarAdmin } from "../../controladores/admin/registro/administrador.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import { validarRegistrarAdmin } from "../../validaciones/admin/registro.validacion.mjs";

const router = Router();

router.post("/", proteger("administrador"), validarRegistrarAdmin, registrarAdmin);

export { router as registroRutasAdmin };
