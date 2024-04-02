const express = require('../packages/node_modules/express');
const router = express.Router();
const cartController = require("../controllers/controller.cart");

router.get("/", cartController.getAllAtCart);
router.get("/:id", cartController.getCartById);
router.put("/:id", cartController.updateCart);
router.post("/:id", cartController.addToCart);



module.exports = router;
