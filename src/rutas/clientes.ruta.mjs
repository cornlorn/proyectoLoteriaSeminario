import { Router } from "express";
import { upload } from "../config/multer.config.mjs";
import { autenticar } from "../middlewares/auth.middleware.mjs";

const router = Router();

router.post("/avatar", autenticar, upload.single("avatar"), (request, response) => {
  if (!request.file) {
    return response.status(400).send({ mensaje: "No se ha subido ningún archivo" });
  }
  response.status(200).send({ mensaje: "Avatar subido correctamente" });
});

export { router as clientesRutas };
