const model = require("../models/model.cart");
const pipe = require("../utiles/pipe.product.map");
const validator = require("../utiles/validators/validator.cart");

let getAllCarts = async (req, res) => {
  try {
    const result = await model.aggregate([...pipe("items.productId", "_id")]);
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
      ...pipe("items.productId", "_id")]
    );
    result.length > 0 ?
      res.json({ status: "success", data: result })
      : res.json({ status: "failed", msg: "No Cart Found for Required User" });
  } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }
}
let updateCartProducts = async (req, res) => {
  try {
    const id = req.body.userId;
    const items = req.body.items;
    const args = {userId:id, items: items}
    console.log(args)
    if (validator(args)) {
      const user = await model.findOne({ userId: args.userId });
      
      const result = user
      ? await model.findOneAndUpdate({ userId: args.userId }, { $set: args }, { new: true })
      : await model.create(args);
      
      result
      ? res.status(200).json({ status: "success", msg: "Cart Updated Successfully", data: result })
      : res.status(404).json({ status: "fail", msg: "No Updates Happened" });
    } else {
      res.status(422).json({ status: "fail", message: validator.errors[0].message });
      console.log("user")
    }
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = {
  getAllCarts,
  getUserCart,
  updateCartProducts,
};


