const model = require("../models/model.cart");
const validator = require("../utiles/validators/validator.cart");

let getAllAtCart = async (req,res) => {
    let cartData = await model.find({});
    res.status(200).json({data: cartData});
}

let getCartById = async (req,res) => {
    let cartId = req.params.id;
    let cartData = await model.findOne({_id: cartId});
    if(cartData)
        res.status(200).json({data: cartData});
    else
        res.status(404).json({message:"Cart not found"});

}

//TODO -> the front should send the cart without the deleted product, even if there isn't products, every user has his cart,
//TODO -> cart is deleted when user is deleted
//TODO -> make deleteCart and check if user exists

let updateCart = async (req,res) => {
    let cartId = req.params.id;
        if(validator(req.body)) {
            let cart = await model.updateOne({_id:cartId}, {userId:req.body.userId, productId: req.body.productId});
            if(cart)
                res.status(201).json({message:"Updated Successfully", data:cart});
            else 
                res.status(404).json({message:"Cart not found"});
    } else {
        res.status(404).json({message:validator.errors[0].message});
    }

}

//TODO => maybe will be updated
let addToCart = async (req, res) => {
    let cartId = req.params.id;
    if(validator(req.body)) { 
        let isCartFound = await model.findOne({_id: cartId});
        if(isCartFound) {
            console.log(isCartFound.productId)
            let cart = await model.updateOne({_id:cartId}, {userId:req.body.userId, productId: req.body.productId.push(isCartFound.productId)});
            if(cart)
                res.status(201).json({message:"Product is added Successfully", data:cart});
            else 
                res.status(404).json({message:"Error adding in cart"});
        } else {
            let newCart = new model(req.body);
            newCart.save()
            res.status(201).json({message:"Product is added Successfully", data:newCart})
        }
    } else {
        res.status(404).json({message:validator.errors[0].message});
    }
}

module.exports = {
    getAllAtCart,
    getCartById,
    updateCart,
    addToCart
};