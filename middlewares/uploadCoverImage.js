var multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    req.savedCoverImage = uuidv4() + "." + extension;
    cb(null, req.savedCoverImage);
  },
});

const fileFilter = (req, file, cb) => {
  let allowedMimeTypes = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
  console.log(file);
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Please provide a valid image file"), false);
  }
  return cb(null, true);
};

module.exports.uploadCoverImage = multer({ storage, fileFilter });