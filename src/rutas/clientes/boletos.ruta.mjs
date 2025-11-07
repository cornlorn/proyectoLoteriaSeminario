import { Router } from "express";
import {
  comprarBoletoBingo,
  comprarBoletoNumerico,
  detalleBoletoCliente,
  listarBoletosCliente,
} from "../../controladores/clientes/boletos.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";

const router = Router();

router.use(proteger(["cliente"]));

router.post("/", comprarBoletoNumerico);
router.post("/bingo", comprarBoletoBingo);
router.get("/", listarBoletosCliente);
router.get("/:id", detalleBoletoCliente);

export { router as boletosRouter };
