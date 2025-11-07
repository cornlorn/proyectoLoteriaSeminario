import { Router } from "express";
import { registrar as registrarAdmin } from "../../controladores/admin/registro/administrador.controlador.mjs";
import { registrar as registrarCliente } from "../../controladores/admin/registro/cliente.controlador.mjs";
import { autenticar, verificarRol } from "../../middlewares/auth.middleware.mjs";
import {
  validarRegistrarAdmin,
  validarRegistrarCliente,
} from "../../validaciones/admin/registro.validacion.mjs";

const router = Router();

router.post(
  "/registrar/admin",
  autenticar,
  verificarRol("administrador"),
  validarRegistrarAdmin,
  registrarAdmin,
);
router.post(
  "/registrar/cliente",
  autenticar,
  verificarRol("administrador"),
  validarRegistrarCliente,
  registrarCliente,
);

export { router as registroRutasAdmin };
