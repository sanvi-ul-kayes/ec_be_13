const multer = require("multer");
let mimeType = new Set([
  "image/png",
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/jpg",
]);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extentionName = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${extentionName}`);
  },
});
accepTingMimeType = (req, res, cb) => {
  if (mimeType.has(file.mimeType)) {
    cb(null, true);
  } else {
    cb(new Error("only png,gif,jpeg & jpg file are accepted"), false);
  }
};

const upload = multer(
  { storage: storage },
  {
    limits: {
      fileize: 5 * 1024 * 1024,
    },
    fileFilter: accepTingMimeType,
  }
);

module.exports = upload;
