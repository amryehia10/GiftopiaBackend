const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    _id: String,
    categoryName: String,
    categoryImage: String
}) 

module.exports = database.model('Categories', Schema)