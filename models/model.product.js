const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    name: String,
    desc: String,
    createdAt: String,
    images: [{
        type: String
    }],
    cat:[{
        type: String
    }],
    star: Number,
    price: Number,
    quantity: Number,
    discount: Number,
    numberOfRates: Number,
    numberOfSellings: Number
},{ _id: true }) 

module.exports = database.model('products', Schema)