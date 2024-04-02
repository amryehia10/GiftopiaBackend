const mongoose = require('../packages/node_modules/mongoose');

let userSchema = new mongoose.Schema( {
    name: String,
    image: String,
    address:[{
        type: String
    }],
    email: String,
    age: Number,
    password: String,
    phone: [{
        type: String
    }],
    gender: String,
    userType: String,
}) 

module.exports = mongoose.model('Users', userSchema)