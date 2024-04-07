const database = require('../utiles/handler.database');

let Schema = new database.Schema({
    userId: String,
    cart: [{
        productId: { type: String },
        quantity: { type: Number }
    }],
    total: Number,
    status: String
}, { _id: true })

module.exports = database.model('Cart', Schema)