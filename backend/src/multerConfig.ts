import multer = require('multer');
import path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo
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

