import { Router } from "express";
import { registrarAdministrador } from "../../controladores/admin/registro/administrador.controlador.mjs";
import { registrarCliente } from "../../controladores/admin/registro/cliente.controlador.mjs";
import { registrarVendedor } from "../../controladores/admin/registro/vendedor.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import {
  validarRegistrarAdministrador,
  validarRegistrarCliente,
  validarRegistrarVendedor,
} from "../../validaciones/admin/registro.validacion.mjs";

const router = Router();

router.post(
  "/administrador",
  proteger("administrador"),
  validarRegistrarAdministrador,
  registrarAdministrador,
);

router.post("/vendedor", proteger("administrador"), validarRegistrarVendedor, registrarVendedor);

router.post("/cliente", proteger("administrador"), validarRegistrarCliente, registrarCliente);

export { router as registroRutasAdmin };
