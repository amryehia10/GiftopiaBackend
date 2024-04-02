const mongoose = require('../packages/node_modules/mongoose');

let shippingSchema = new mongoose.Schema( {
    userId: String,
    orderId: String,
    status: String,
}) 

module.exports = mongoose.model('Shipping', shippingSchema)