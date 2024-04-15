const express = require("../packages/node_modules/express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const multer = require("../packages/node_modules/multer");
const path = require("path");
const AuthMiddleware = require("../middle-wares/AuthMiddleware ");

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/login", controller.login);
router.post("/register", upload.single("profileImage"), controller.register);

router.get("/userDetails", AuthMiddleware.verifyToken, controller.userDetails);

router.put(
  "/user/:userId",
  AuthMiddleware.verifyToken,
  upload.single("profileImage"),
  controller.updateUser
);
router.delete(
  "/user/:userId",
  AuthMiddleware.verifyToken,
  controller.deleteUser
);

module.exports = router;
