const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.user");

router.get("/", controller.getAllUsers);
router.get("/:userId", controller.getUserByID);

module.exports = router;