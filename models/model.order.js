const mongoose = require('../packages/node_modules/mongoose');

let orderSchema = new mongoose.Schema( {
    userId: String,
    cartId: String,
    status: String,
    paymentMethod: String,
    address: String
}) 

module.exports = mongoose.model('Orders', orderSchema)