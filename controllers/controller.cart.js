const cart = require("../models/model.cart");
const product = require("../models/model.product");
const validator = require("../utiles/validators/validator.cart");

let getAllAtCartByUserId = async (req, res) => {
    let userId = req.params.userId;
    let cartData = await cart.find({ userId: userId });
    if (cartData) {
        return res.status(200).json({ data: cartData });
    } else
        return res.status(404).json({ message: "User not found to display the cart" });

}

// let getCartById = async (req,res) => {
//     let cartId = req.params.id;
//     let cartData = await cart.findOne({_id: cartId});
//     if(cartData)
//         res.status(200).json({data: cartData});
//     else
//         res.status(404).json({message:"Cart not found"});

// }

//TODO -> the front should send the cart without the deleted product, even if there isn't products, every user has his cart,
//TODO -> cart is deleted when user is deleted
//TODO -> make deleteCart and check if user exists

let updateCart = async (req, res) => {
    let cartId = req.params.id;
    if (validator(req.body)) {
        let cart = await cart.updateOne({ _id: cartId }, { userId: req.body.userId, productId: req.body.productId });
        if (cart)
            res.status(201).json({ message: "Updated Successfully", data: cart });
        else
            res.status(404).json({ message: "Cart not found" });
    } else {
        res.status(404).json({ message: validator.errors[0].message });
    }

}

//TODO => maybe will be updated
let addToCart = async (req, res) => {
    let productId = req.body.productId;
    if (validator(req.body)) {
        let isProductFound = await product.findOne({ _id: productId[0] });
        if (!isProductFound) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        } else {
            let userId = req.params.userId;
            let quantity = req.body.quantity;
            let total = req.body.total;
            let cartData = await cart.find({ userId: userId });
            if (cartData) {
                const productIndexFound = cartData[0].productId.indexOf(productId);

                //product found in cart
                if (productIndexFound !== -1) {
                    cartData[0].quantity += quantity;
                    cartData[0].total += total;
                } else {
                    cartData[0].productId.push(productId);
                }
            } else {
                return res.status(404).json({ message: "Error adding in cart" });
            }
        }
        // console.log(isCartFound.productId)
        // let cart = await cart.updateOne({_id:cartId}, {userId:req.body.userId, productId: req.body.productId.push(isCartFound.productId)});
        // if(cart)
        //     res.status(201).json({message:"Product is added Successfully", data:cart});
        // else 
        //     res.status(404).json({message:"Error adding in cart"});
        //     } else {
        //         let newCart = new cart(req.body);
        //         newCart.save()
        //         res.status(201).json({message:"Product is added Successfully", data:newCart})
        //     }
    } else {
        res.status(404).json({ message: validator.errors[0].message });
    }
}

module.exports = {
    getAllAtCartByUserId,
    // getCartById,
    updateCart,
    addToCart
};