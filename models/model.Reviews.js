const mongoose = require('../packages/node_modules/mongoose/types');

let reviewSchema = new mongoose.Schema( {
    userId: String,
    productId: String,
    ReviewText: String,
    rate: Number
}) 

module.exports = mongoose.model('Reviews', reviewSchema)