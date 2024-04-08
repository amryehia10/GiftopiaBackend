const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.cart");

router.get("/", controller.getAllCarts);
router.get("/:userId", controller.getUserCart);
router.put("/", controller.updateCartProducts);
// router.post("/:userId", controller.addNewCart);
// router.put("/status/:userId", controller.updateCartStatus);

module.exports = router;
