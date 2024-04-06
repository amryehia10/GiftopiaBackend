const cart = require("../models/model.cart");
const product = require("../models/model.product");
const validator = require("../utiles/validators/validator.cart");

let getAllAtCartByUserId = async (req, res) => {
    const userId = req.params.userId;
    const cartData = await cart.find({ userId: userId });
    if (cartData) {
        return res.status(200).json({ data: cartData });
    } else
        return res.status(404).json({ message: "User was not found to display the cart" });

}

let deleteProductAtCart = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.productId;
    console.log(productId)
    const isProductFound = await product.findOne({ _id: productId });
    if (isProductFound) {
        const cartData = await cart.findOne({ userId: userId });
        const productIndexFound = cartData.productId.indexOf(productId);
        if (productIndexFound !== -1) {
            const prdTotal = isProductFound.price *  cartData.quantity[productIndexFound];
            cartData.total -=  prdTotal;
            cartData.productId.splice(productIndexFound, 1);
            cartData.quantity.splice(productIndexFound, 1);
        }else {
            return res.status(404).json({ message: "Product was not found in the cart" });
        }
        const newCart = await cart.updateOne({ _id: cartData._id }, cartData);
        if (newCart)
            res.status(201).json({ message: "Product was removed Successfully"});
        else
            res.status(404).json({ message: "There is error in removing the product" });
    } else {
        res.status(404).json({ message: "Product was not found in database"});
    }
}

let addToCart = async (req, res) => {
    const productId = req.body.productId;
    if (validator(req.body)) {
        const isProductFound = await product.findOne({ _id: productId[0] });
        if (!isProductFound) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        } else {
            const userId = req.params.userId;
            const quantity = req.body.quantity;
            const total = req.body.total;
            const cartData = await cart.findOne({ userId: userId });
            if (cartData) {
                const productIndexFound = cartData.productId.indexOf(productId);

                //product found in cart
                if (productIndexFound !== -1) {
                    cartData.quantity[productIndexFound] += quantity[0];
                    cartData.total += total;
                } else {
                    cartData.productId.push(productId[0]);
                    cartData.quantity.push(quantity[0]);
                    cartData.total += total;
                }

                const newCart = await cart.updateOne({ _id: cartData._id }, cartData);

                if (cart)
                    return res.status(201).json({ message: "Product added to cart Successfully", data: newCart });
                else
                    return res.status(404).json({ message: "Error adding to cart" });

            } else {
                return res.status(404).json({ message: "Error adding to cart" });
            }
        }
    } else {
        res.status(404).json({ message: validator.errors[0].message });
    }
}

module.exports = {
    getAllAtCartByUserId,
    deleteProductAtCart,
    addToCart
};