const express = require('../packages/node_modules/express');
const router = express.Router();
const cartController = require("../controllers/controller.cart");

router.get("/", cartController);

module.exports = router;
