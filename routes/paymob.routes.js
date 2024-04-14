const express = require('express');
const router = express.Router();
const controller = require("../controllers/paymob.controller")

router.post('/create-order', controller.createPayment)

module.exports = router;
