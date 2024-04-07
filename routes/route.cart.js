const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.cart");

router.get("/", controller.getAllCarts);
router.get("/:userId", controller.getAllAtCartByUserId);
router.put("/:userId", controller.deleteProductAtCart);
router.post("/:userId", controller.addToCart);



module.exports = router;
