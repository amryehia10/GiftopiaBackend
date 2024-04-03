const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.product");


router.get("/", controller.getAllProducts);
// router.get("/:id", controller.getProductById);
router.get("/category/:id", controller.getProductByCategory);

// router.post("/:id", controller.addNewProduct);

// router.put("/:id", controller.updateProduct);
// router.post("/:id", controller.deleteProduct);



module.exports = router;
