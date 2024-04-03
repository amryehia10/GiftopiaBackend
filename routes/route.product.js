const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.product");


router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductByID);
router.get("/category/:id", controller.getProductsByCategory);

router.post("/", controller.addNewProduct);

router.put("/:id", controller.updateProduct);
router.post("/:id", controller.deleteProduct);



module.exports = router;
