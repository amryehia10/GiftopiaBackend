const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    userId: String,
    productId:[{
        type: String
    }]
}) 

module.exports = database.model('Cart', Schema)