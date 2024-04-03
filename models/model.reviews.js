const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    userId: String,
    productId: String,
    comment: String,
    rate: Number
},{ _id: true }) 

module.exports = database.model('Reviews', Schema)