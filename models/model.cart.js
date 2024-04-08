const database = require('../utiles/handler.database');

let Schema = new database.Schema({
    userId: String,
    items: [{
        productId: { type: database.Schema.Types.ObjectId, ref: 'Product'  },
        soldQuantity: { type: Number }
    }],
    total: Number,
}, { _id: true })

module.exports = database.model('Cart', Schema)