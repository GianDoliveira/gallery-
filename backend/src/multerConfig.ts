import multer = require('multer');
import path = require('path');
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destFolder = 'uploads/';
    // Crie a pasta se ela não existir
    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder);
    }
    cb(null, destFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limite de tamanho do arquivo (5MB)
  },
  fileFilter: function (req, file, cb) {
    // Filtrar tipos de arquivo permitidos (exemplo: imagens)
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Apenas imagens são permitidas!'));
  },
});

export default upload;

