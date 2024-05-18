const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

function filtroDeImgs(req, file, cb) {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb("Por favor, apenas faça upload de imgs!", false);
}

const armazenamento_Multer = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathDestino = path.join(__dirname, "../res/photo/profile/tmp");
    cb(null, pathDestino);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);

      const key = `${hash.toString("hex")}-${file.originalname}`;
      file.key = key;
      cb(null, key);
    });
  },
});

const uploadMiddleware = multer({
  storage: armazenamento_Multer,
  fileFilter: filtroDeImgs,
});

module.exports = uploadMiddleware;
