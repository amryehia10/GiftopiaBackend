const isAdmin = require('../middle-wares/AuthMiddleware ').isAdmin;
const express = require('../node_modules/express');

const router = express.Router();
const user = require("../controllers/controller.user");
const admin = require("../controllers/admin.controller");
const order = require("../controllers/controller.order");
const ticket = require("../controllers/controller.ticket");
const product = require("../controllers/controller.product");
const category = require("../controllers/controller.category");

//#region Dashboard
router.get("/", admin.getDashoard);
//#endregion


//#region Category 
router.put("/category/", isAdmin, category.updateCategory);
router.post("/category/", isAdmin, category.addNewCategory);
router.get("/category/", isAdmin, category.getAllCategories);
router.delete("/category/:id", isAdmin, category.deleteCategory);
//#endregion


//#region Product 
router.get("/product/", isAdmin, product.getAllProducts);
router.post("/product/", isAdmin, product.addNewProduct);
router.put("/product/:id", isAdmin, product.updateProduct);
router.delete("/product/:id", isAdmin, product.deleteProduct);
//#endregion


//#region Order 
router.get("/order", isAdmin, order.getAllOrders);
router.put("/order/:id", isAdmin, order.changeOrderStatus);
//#endregion


//#region User 
router.get("/user/", isAdmin, user.getAllUsers);
//#endregion


//#region Ticket 
router.get("/ticket/", isAdmin, ticket.getAllTickets);
//#endregion


module.exports = router;
