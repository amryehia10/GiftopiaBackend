const express = require('../node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.wishlist");

router.get("/:userId", controller.getUserWishlist);
router.put("/", controller.updateWishlist);

module.exports = router;