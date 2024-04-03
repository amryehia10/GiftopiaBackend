const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    userName: String,
    userEmail: String,
    message: String
}) 

module.exports = database.model('contact-us', Schema)