const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.cart");

router.get("/cart/:userId", controller.getAllAtCartByUserId);
// router.get("/:id", controller.getCartById);
router.put("/cart/:id", controller.updateCart);
router.post("/cart/:userId", controller.addToCart);



module.exports = router;
