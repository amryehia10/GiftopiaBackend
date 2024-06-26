const express = require("../node_modules/express");
const router = express.Router();
const controller = require("../controllers/controller.product");

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductByID);
router.get("/keyword/:keyword", controller.getProductsByKeyword);
router.get("/date/old", controller.getOldProducts);
router.get("/category/:id", controller.getProductsByCategory);
router.get("/date/new-arrival", controller.getNewArrivalProducts);

module.exports = router;
