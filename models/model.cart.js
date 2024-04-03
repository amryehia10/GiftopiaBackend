const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    userId: String,
    productId:[{
        type: String
    }],
    quantity: [{type: Number}],
    total: Number
},{ _id: true }) 

module.exports = database.model('Cart', Schema)