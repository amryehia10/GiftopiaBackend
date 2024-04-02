const mongoose = require('../packages/node_modules/mongoose');

let cartSchema = new mongoose.Schema( {
    userId: String,
    productId:[{
        type: String
    }]
}) 

module.exports = mongoose.model('Cart', cartSchema)