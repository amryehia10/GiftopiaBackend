const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    name: String,
    email: String,
    message: String
},{ _id: true }) 

module.exports = database.model('tickets', Schema)