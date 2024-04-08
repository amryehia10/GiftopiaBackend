const database = require('../utiles/handler.database');

let Schema = new database.Schema({
    userId: String,
    status: String,
    address: String,
    paymentMethod: String,
    items: [{
        productId: { type: database.Schema.Types.ObjectId, ref: 'Product' },
        soldQuantity: { type: Number }
    }]
}, { _id: true })

module.exports = database.model('Orders', Schema)

