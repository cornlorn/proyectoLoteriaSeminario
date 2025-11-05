import { Router } from "express";
import { upload } from "../config/multer.config.mjs";
import { cambiar } from "../controladores/clientes/avatar.controlador.mjs";
import { registrar } from "../controladores/clientes/registro.controlador.mjs";
import { autenticar } from "../middlewares/auth.middleware.mjs";
import { validarRegistroCliente } from "../validaciones/clientes/registro.validacion.mjs";

const router = Router();

router.post("/registrar", validarRegistroCliente, registrar);

router.post("/avatar", autenticar, upload.single("avatar"), cambiar);

export { router as clientesRutas };
