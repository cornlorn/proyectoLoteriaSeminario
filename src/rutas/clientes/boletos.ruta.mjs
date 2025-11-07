import { Router } from "express";
import {
  comprarBoletoBingo,
  comprarBoletoNumerico,
  detalleBoletoCliente,
  listarBoletosCliente,
} from "../../controladores/clientes/boletos.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import {
  validarCompraBingo,
  validarCompraNumerica,
  validarDetalleBoleto,
} from "../../validaciones/clientes/boletos.validacion.mjs";

const router = Router();

router.use(proteger(["cliente"]));

router.post("/", validarCompraNumerica, comprarBoletoNumerico);
router.post("/bingo", validarCompraBingo, comprarBoletoBingo);
router.get("/", listarBoletosCliente);
router.get("/:id", validarDetalleBoleto, detalleBoletoCliente);

export { router as boletosRouter };
