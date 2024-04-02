const mongoose = require('../packages/node_modules/mongoose');

let wishlistSchema = new mongoose.Schema( {
    userId: String,
    productId:[{
        type: String
    }]
}) 

module.exports = mongoose.model('WishList', wishlistSchema)