import { Router } from "express";
import { listarSorteosDisponibles } from "../../controladores/publico/sorteos.controlador.mjs";
import { validarListadoSorteosDisponibles } from "../../validaciones/publico/sorteos.validacion.mjs";

export const sorteosPublicosRouter = Router();

sorteosPublicosRouter.get("/disponibles", validarListadoSorteosDisponibles, listarSorteosDisponibles);
