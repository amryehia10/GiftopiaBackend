const express = require('../node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.review");

router.get("/product/:productId", controller.getReviewsByProductID);
router.post( "/", controller.addNewReview );

module.exports = router;