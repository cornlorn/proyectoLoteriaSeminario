import { Router } from "express";
import { buscarCliente } from "../../controladores/vendedores/buscar-cliente.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import { validarBuscarCliente } from "../../validaciones/vendedores/buscar-cliente.validacion.mjs";

const router = Router();

router.get("/", proteger("vendedor"), validarBuscarCliente, buscarCliente);

export { router as buscarClienteRutas };
