const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    userId: String,
    productId: String,
    ReviewText: String,
    rate: Number
}) 

module.exports = database.model('Reviews', Schema)