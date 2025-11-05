import { Router } from "express";
import { authRutas } from "./auth.ruta.mjs";
import { clientesRutas } from "./clientes.ruta.mjs";

const router = Router();

router.use("/clientes", clientesRutas);

router.use("/auth", authRutas);

export { router as rutas };
