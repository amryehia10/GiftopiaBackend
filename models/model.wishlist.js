const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    userId: String,
    products:[{
        type: database.Schema.Types.ObjectId, ref: 'Product' 
    }]
},{ _id: true }) 

module.exports = database.model('WishList', Schema)