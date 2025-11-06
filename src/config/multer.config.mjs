import fs from "fs";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (request, _file, callback) => {
    const uploads = path.join("public", "profile", request.usuario.id.toString());

    if (!fs.existsSync(uploads)) {
      fs.mkdirSync(uploads, { recursive: true });
    }

    callback(null, uploads);
  },
  filename: (request, file, callback) => {
    const extension = file.originalname.split(".").pop();
    callback(null, `${crypto.randomUUID()}.${extension}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    const allowed = ["image/jpeg", "image/png"];
    callback(null, allowed.includes(file.mimetype));
  },
});
