const model = require("../models/model.cart");
const product = require("../models/model.product");
const validator = require("../utiles/validators/validator.cart");

let getAllCarts = async (req, res) => {
    const result = await model.find({}, { "cart._id": 0 });
    result ?
        res.status(200).json({ data: result })
        : res.status(404).json({ message: "User was not found to display the cart" });

}

let getCartsByUserID = async (req, res) => {
    const userId = req.params.userId;
    const cartData = await model.find({ userId: userId }, { "cart._id": 0 });
    cartData ?
        res.status(200).json({ data: cartData })
        : res.status(404).json({ message: "User was not found to display the cart" });

}

let updateCartStatus = async (req, res) => {
    try {
        const args = req.body
        if (validator(args)) {
            const cart = await model.updateOne({ _id: args._id, status: { $ne: "pending" } }, { status: args.status })
            cart ?
                res.json({ status: "success", msg: "Cart-Status is Updated Successfully" })
                : res.json({ status: "failed", msg: `Current Cart Status Can\`t apply updates` });
        } else {
            res.status(404).json({ status: "fail", message: validator.errors[0].message });
        }
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

let updateCartProducts = async (req, res) => {
    try {
        const args = req.body
        if (validator(args)) {
            const cart = await model.findOneAndUpdate(
                { _id: req.params.cartId, status: "pending" },
                { cart: args.cart, total: args.total },
                { new: true }
            );
            cart ?
                res.json({ status: "success", msg: "Cart-Products are Updated Successfully", msg: cart })
                : res.json({ status: "failed", msg: `Current Cart Can\`t apply updates` });
        } else {
            res.status(404).json({ status: "fail", message: validator.errors[0].message });
        }
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

let addNewCart = async (req, res) => {
    try {
        let args = req.body;
        if (validator(args)) {
            let cart = new model(args)
            cart.save();
            res.status(200).json({ status: "success", message: "Cart is Added Successfully" });
        }
        else {
            res.status(404).json({ status: "fail", message: validator.errors[0].message });
        }
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}


module.exports = {
    addNewCart,
    getAllCarts,
    getCartsByUserID,
    updateCartStatus,
    updateCartProducts,
};

//Cart {pending, submit, cancel}
/**
 * add-New-Cart===>Done
 * get-User-Cart===>Done
 * update-Cart-Status===>Done
 * update-Cart-Products===>Done
 */