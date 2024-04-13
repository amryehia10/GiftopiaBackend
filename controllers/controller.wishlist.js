const model = require("../models/model.wishlist");
const pipe = require("../utiles/pipe.product.map");
const validator = require("../utiles/validators/validator.wishlist");

// let getAllWishlist = async (req, res) => {
//   try {
//     const result = await model.aggregate([...pipe("items.productId", "_id")]);
//     result ?
//       res.json({ status: "success", data: result })
//       : res.json({ status: "failed", msg: "Cart Collection is Empty" });
//   } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }
// }

let getUserWishlist = async (req, res) => {
    try {
        const result = await model.aggregate([
            {
                $match: {
                    userId: req.params.userId
                }
            },
            ...pipe("products", "_id",false),
            {
                $project: {
                    soldQuantity: 0
                }
            }]
        );
        result.length > 0 ?
            res.json({ status: "success", data: result })
            : res.json({ status: "failed", msg: "No Cart Found for Required User" });
    } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }
}
let updateWishlist = async (req, res) => {
    try {
        const id = req.body.userId;
        const items = req.body.items;
        const args = {userId:id, products: items}
        console.log(args)
        if (validator(args)) {
            const user = await model.findOne({ userId: args.userId });

            const result = user
                ? await model.findOneAndUpdate({ userId: args.userId }, { $set: args }, { new: true })
                : await model.create(args);

            result
                ? res.status(200).json({ status: "success", msg: "Wishlist Updated Successfully", data: result })
                : res.status(404).json({ status: "fail", msg: "No Updates Happened" });
        } else {
            res.status(422).json({ status: "fail", message: validator.errors[0].message });
        }
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

module.exports = {
    getUserWishlist,
    updateWishlist,
};


