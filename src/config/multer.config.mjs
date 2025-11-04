import fs from "fs";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const uploads = path.join("public", "avatares");

    if (!fs.existsSync(uploads)) {
      fs.mkdirSync(uploads, { recursive: true });
    }

    callback(null, uploads);
  },
  filename: (request, file, callback) => {
    const extension = file.originalname.split(".").pop();
    callback(null, `${request.user.id}.${extension}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    const allowed = ["image/jpeg", "image/png"];
    callback(null, allowed.includes(file.mimetype));
  },
});
