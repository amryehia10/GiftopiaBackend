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
        const args = req.body;
        if (validator(args)) {
            const user = await model.findOne({ userId: args.userId })
            if (user) {
                const result = await model.findOneAndUpdate(
                    { userId: args.userId },
                    { items: args.items },
                    { new: true });
                result ?
                    res.status(200).json({ status: "success", msg: "Cart Products Updated Successfully ", data: result })
                    : res.status(404).json({ status: "fail", msg: "No Updates Happened" });
            } else {
                const result = await model.create({ ...args })
                res.status(200).json({ status: "success", msg: "Cart Created Successfully", data: result })
            }
        } else {
            res.status(422).json({ status: "fail", message: validator.errors[0].message });
        }
    } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }
};

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
                    image: { $arrayElemAt: ["$$product.images", 0] },
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