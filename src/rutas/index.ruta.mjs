import { Router } from "express";
import { clientesRutas } from "./clientes.ruta.mjs";

const router = Router();

router.use("/clientes", clientesRutas);

export { router as rutas };
