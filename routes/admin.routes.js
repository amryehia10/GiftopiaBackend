const adminMiddleware = require('../middle-wares/middle-ware.admin');
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
router.get("/", adminMiddleware, admin.getDashoard);
//#endregion


//#region Category 
router.put("/category/",  category.updateCategory);
router.post("/category/",  category.addNewCategory);
router.get("/category/",  category.getAllCategories);
router.delete("/category/:id",  category.deleteCategory);
//#endregion


//#region Product 
router.get("/product/",  product.getAllProducts);
router.post("/product/",  product.addNewProduct);
router.put("/product/:id",  product.updateProduct);
router.delete("/product/:id",  product.deleteProduct);
//#endregion


//#region Order 
router.get("/order",  order.getAllOrders);
router.put("/order/:id",  order.changeOrderStatus);
//#endregion


//#region User 
router.get("/user/",  user.getAllUsers);
//#endregion


//#region Ticket 
router.get("/ticket/",  ticket.getAllTickets);
//#endregion


module.exports = router;
