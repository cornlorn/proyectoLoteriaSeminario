import { Router } from "express";
import { registrar } from "../../controladores/clientes/registro.controlador.mjs";
import { validarRegistroCliente } from "../../validaciones/clientes/registro.validacion.mjs";

const router = Router();

router.post("/", validarRegistroCliente, registrar);

export { router as registroRutas };
