import { Router } from "express";
import { clientesRutas } from "./clientes.ruta.mjs";
import { usuariosRutas } from "./usuarios.ruta.mjs";

const router = Router();

router.use("/usuarios", usuariosRutas);

router.use("/clientes", clientesRutas);

export { router as rutas };
