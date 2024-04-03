const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    userId: String,
    cartId: String,
    status: String,
    paymentMethod: String,
    address: String
},{ _id: true }) 

module.exports = database.model('Orders', Schema)