import { Router } from "express";
import { obtenerSorteos } from "../../controladores/admin/juegos/sorteo.controlador.mjs";
import { proteger } from "../../middlewares/auth.middleware.mjs";
import { validarListarSorteos } from "../../validaciones/admin/sorteos.validacion.mjs";

const router = Router();

router.get("/", proteger("administrador"), validarListarSorteos, obtenerSorteos);

export { router as rutasSorteos };
