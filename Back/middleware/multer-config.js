const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(
      null,
      req.originalUrl.includes('upload') ? '../front/public/uploads/profil' : '../front/public/uploads/post'
    );
  },
  filename: (req, file, callback) => {
    const fileName = req.originalUrl.includes('upload')
      ? req.auth.userId + '.jpg'
      : Date.now() + req.auth.userId + '.jpg';
    callback(null, fileName);
  },
});

module.exports = multer({ storage: storage }).single('file');
