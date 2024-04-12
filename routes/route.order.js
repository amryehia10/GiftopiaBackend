const express = require('../node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.order");

router.get("/:userId", controller.getUserOrders);

router.put("/:id", controller.changeOrderStatus);

router.post("/", controller.addNewOrder);
// router.delete("/", controller.deleteOrder,);



module.exports = router;
