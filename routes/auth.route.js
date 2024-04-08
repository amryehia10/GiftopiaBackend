const express = require("../packages/node_modules/express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const multer = require("../packages/node_modules/multer");
const path = require("path");

// Set up multer for file upload
const storage = multer.diskStorage({
  // `${Date.now()}_${file.originalname}_${path.extname(file.originalname)}`
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/login", controller.login);
// router.post("/logout", controller.logout);
router.post("/register", upload.single("profileImage"), controller.register);

module.exports = router;
