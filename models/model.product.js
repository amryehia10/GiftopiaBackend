const mongoose = require('../packages/node_modules/mongoose');

let productSchema = new mongoose.Schema( {
    name: String,
    images: [{
        type: String
    }],
    cat:[{
        type: String
    }],
    desc: String,
    star: Number,
    price: Number,
    quantity: Number,
    discount: Number,
    numberOfSellings: Number,
    numberOfRates: Number
}) 

module.exports = mongoose.model('Products', productSchema)