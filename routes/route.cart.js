const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.cart");

router.get("/", controller.getAllCarts);
router.post("/:userId", controller.addNewCart);
router.get("/:userId", controller.getCartsByUserID);
router.put("/:cartId", controller.updateCartProducts);
router.put("/status/:userId", controller.updateCartStatus);

module.exports = router;
