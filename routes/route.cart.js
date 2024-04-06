const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.cart");

router.get("/cart/:userId", controller.getAllAtCartByUserId);
router.put("/cart/:userId", controller.deleteProductAtCart);
router.post("/cart/:userId", controller.addToCart);



module.exports = router;
