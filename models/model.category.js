const mongoose = require('../packages/node_modules/mongoose');

let categorySchema = new mongoose.Schema( {
    _id: String,
    CategoryName: String,
    categoryImage: String
}) 

module.exports = mongoose.model('Categories', categorySchema)