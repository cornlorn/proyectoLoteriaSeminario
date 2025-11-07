import { Router } from "express";
import { rutasJuegos } from "./admin/juegos.ruta.mjs";
import { registroRutasAdmin } from "./admin/registro.ruta.mjs";
import { rutasSorteos } from "./admin/sorteos.ruta.mjs";
import { ingresoRutas } from "./auth/ingreso.ruta.mjs";
import { recuperacionRutas } from "./auth/recuperacion.ruta.mjs";
import { registroRutas } from "./auth/registro.ruta.mjs";
import { verificacionRutas } from "./auth/verificacion.ruta.mjs";
import { avatarRutas } from "./clientes/avatar.ruta.mjs";
import { boletosRouter } from "./clientes/boletos.ruta.mjs";
import { perfilRutas } from "./clientes/perfil.ruta.mjs";
import { depositoRutas } from "./vendedores/deposito.ruta.mjs";
import { retiroRutas } from "./vendedores/retiro.ruta.mjs";

const router = Router();

router.use("/auth/ingresar", ingresoRutas);
router.use("/auth/registrar", registroRutas);
router.use("/auth/correo", verificacionRutas);
router.use("/auth/recuperacion", recuperacionRutas);

router.use("/admin/registrar", registroRutasAdmin);
router.use("/admin/juegos", rutasJuegos);
router.use("/admin/sorteos", rutasSorteos);

router.use("/vendedores/depositar", depositoRutas);
router.use("/vendedores/retirar", retiroRutas);

router.use("/clientes/perfil", perfilRutas);
router.use("/clientes/avatar", avatarRutas);
router.use("/clientes/boletos", boletosRouter);

export { router as rutas };
