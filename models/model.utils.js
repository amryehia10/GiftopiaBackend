const database = require('../utiles/handler.database');

let Schema = new database.Schema( {
    token: String,
    userType: String,
},{ _id: true }) 

module.exports = database.model('util', Schema)