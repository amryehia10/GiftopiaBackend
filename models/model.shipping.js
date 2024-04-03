const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    userId: String,
    orderId: String,
    status: String,
},{ _id: true }) 

module.exports = database.model('Shipping', Schema)