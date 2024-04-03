const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.category");


router.get("/", controller.getAllCategories);
router.get("/:id", controller.getCategoryByID);

router.post("/", controller.addNewCategory);

router.put("/:id", controller.updateCategory);

router.delete("/:id", controller.deleteCategory);



module.exports = router;
