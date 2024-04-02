const cartValidation = require("../utiles/validators/CartValidation");
const cartModel = require("../models/model.cart");

let getAllAtCart = async (req,res) => {
    let cartData = await cartModel.find({});
    console.log(cartData)
    res.status(200).json({data: cartData});
}

//TODO
let deleteFromCart = async (req,res) => {
}

module.exports = getAllAtCart;