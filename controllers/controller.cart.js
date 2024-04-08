const model = require("../models/model.cart");
const validator = require("../utiles/validators/validator.cart");

let getAllCarts = async (req, res) => {
    try {
        const result = await model.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "products"
                }
            },
            mapProduct
        ]);
        result ?
            res.json({ status: "success", data: result })
            : res.json({ status: "failed", msg: "Cart Collection is Empty" });
    } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }
}

let getUserCart = async (req, res) => {
    try {
        const result = await model.aggregate([
            {
                $match: {
                    userId: req.params.userId
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "products"
                }
            },
            mapProduct
        ]);
        result ?
            res.json({ status: "success", data: result })
            : res.json({ status: "failed", msg: "No Cart Found for Required User" });
    } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }
}

let updateCartProducts = async (req, res) => {
    try {
        const args = req.body
        console.log(args)
        if (validator(args)) {
            const result = await model.findOneAndUpdate(
                { userId: req.params.cartId },
                { userId: args.userId, total: args.total, items: args.items },
                { upsert: true, new: true }
            );

            result ?
                res.json({ status: "success", msg: "Cart Products are Updated Successfully", data: result })
                : res.json({ status: "failed", msg: `Current Cart Can\`t apply updates` });
        } else {
            res.status(404).json({ status: "fail", message: validator.errors[0].message });
        }
    } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }
}

module.exports = {
    getAllCarts,
    getUserCart,
    updateCartProducts,
};

const mapProduct = {
    $project: {
        userId: 1,
        total: 1,
        products: {
            $map: {
                input: "$products",
                as: "product",
                in: {
                    _id: "$$product._id",
                    name: "$$product.name",
                    price: "$$product.price",
                    images: "$$product.images",
                    quantity: "$$product.quantity",
                    discount: "$$product.discount",
                    soldQuantity: {
                        $let: {
                            vars: {
                                soldQuantities: "$items.soldQuantity",
                                productIndex: { $indexOfArray: ["$items.productId", "$$product._id"] }
                            },
                            in: { $arrayElemAt: ["$$soldQuantities", "$$productIndex"] }
                        }
                    }
                }
            }
        }
    }
};
// addNewCart,
// updateCartStatus,


//#region Old Methods
/*
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
*/



//Cart {pending, submit, cancel}
/**
 * add-New-Cart===>Done
 * get-User-Cart===>Done
 * update-Cart-Status===>Done
 * update-Cart-Products===>Done
*/
//#endregion