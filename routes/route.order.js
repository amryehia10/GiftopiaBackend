const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.order");

router.get("/", controller.getAllOrders);
router.get("/:userId", controller.getUserOrders);

router.put("/", controller.changeOrderStatus);

router.post("/", controller.addNewOrder);
// router.delete("/", controller.deleteOrder,);



module.exports = router;
