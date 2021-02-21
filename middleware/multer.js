const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

upload = multer({ storage });

module.exports = upload;

// const storage = multer.diskStorage({
//     destination: "./media",
//     filename: (req, file, cb) => {
//       cb(null, `${+new Date()}${file.originalname}`);
//     },
//   });
