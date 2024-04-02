const mongoose = require('../utiles/handler.database');

let cartSchema = new mongoose.Schema( {
    userId: String,
    productId:[{
        type: String
    }]
}) 

module.exports = mongoose.model('Cart', cartSchema)