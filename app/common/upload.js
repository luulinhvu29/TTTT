var multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "G:\\xampp\\htdocs\\magento2\\pub\\media\\catalog\\blog");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".");
    const newExt = ext[ext.length - 1];
    cb(null, `${Date.now()}.${newExt}`);
  },
});
module.exports = { upload: multer({ storage: storage }) };