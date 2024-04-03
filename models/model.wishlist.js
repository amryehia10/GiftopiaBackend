const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    userId: String,
    productId:[{
        type: String
    }]
},{ _id: true }) 

module.exports = database.model('WishList', Schema)