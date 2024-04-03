const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    name: String,
    image: String
},{ _id: true }) 

module.exports = database.model('Categories', Schema)