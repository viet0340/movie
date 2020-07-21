const multer = require('multer');

const product = process.env.NODE_ENV;

let storage;

if (product === 'product') {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './client/build/uploads/film');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname + '.' + file.mimetype.split('/')[1]);
    },
  });
}
if (product === 'dev') {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './client/public/uploads/film');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname + '.' + file.mimetype.split('/')[1]);
    },
  });
}

const upload = multer({ storage: storage });

module.exports = upload;
