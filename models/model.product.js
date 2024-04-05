const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    name: String,
    images: [{
        type: String
    }],
    cat:[{
        type: String
    }],
    desc: String,
    star: Number,
    price: Number,
    quantity: Number,
    discount: Number,
    numberOfSellings: Number,
    numberOfRates: Number,
    createdAt: String
},{ _id: true }) 

module.exports = database.model('products', Schema)