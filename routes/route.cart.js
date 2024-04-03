const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.cart");

router.get("/:userId", controller.getAllAtCartByUserId);
// router.get("/:id", controller.getCartById);
router.put("/:id", controller.updateCart);
router.post("/:userId", controller.addToCart);



module.exports = router;
