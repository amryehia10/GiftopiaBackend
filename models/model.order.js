const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    userId: String,
    cartId: String,
    status: String,
    paymentMethod: String,
    address: String
}) 

module.exports = database.model('Orders', Schema)