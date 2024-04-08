const cart = require("../models/model.cart");
const model = require("../models/model.order");
const validator = require("../utiles/validators/validator.order");

let addNewOrder = async (req, res) => {
  try {
    let args = req.body;
    if (validator(args)) {
      let order = new model(args)
      order.save();
      res.status(200).json({ status: "success", message: "Order is added successfully" });
    } else {
      res.status(404).json({ status: "fail", message: validator.errors[0].message });
    }
  } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }

}

let getAllOrders = async (req, res) => {
  try {
    const result = await model.aggregate([
      {
        $lookup: {
          from: 'carts', // This should match the name of the collection MongoDB uses for carts
          localField: 'cartId', // The field in the Order collection
          foreignField: '_id', // The corresponding field in the Cart collection that matches localField
          as: 'cartDetails' // The array field where the matched documents from the Cart collection will be placed
        }
      },
      
    ]);
    // let result = await model.find({});
    console.log(result);
    result ?
      res.status(200).json({ status: "success", data: result })
      : res.status(404).json({ status: "fail", message: "Error Happened" });
  } catch (error) {
    console.error('Failed to fetch orders with details:', error);
    throw error; // Rethrow or handle as needed
  }
}

let getUserOrders = async (req, res) => {

}

let changeOrderStatus = async (req, res) => {
  try {
    let args = req.body;
    if (validator(args)) {
      let result = await model.findOneAndUpdate({ _id: args._id }, { status: args.status }, { new: true })
      console.log(result)
      result ?
        res.status(200).json({ status: "success", message: "Order-Status is updated successfully" })
        : res.status(404).json({ status: "fail", message: "Error Happened" });
    } else {
      res.status(404).json({ status: "fail", message: validator.errors[0].message });
    }
  } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }

}

let deleteOrder = async (req, res) => {
  try {
    let args = req.body;

    let result = await model.findOneAndUpdate({ _id: args._id }, { status: "Canceled" }, { new: true })
    console.log(result)
    result ?
      res.status(200).json({ status: "success", message: "Order-Status is canceled successfully" })
      : res.status(404).json({ status: "fail", message: "Error Happened" });

  } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }
}
module.exports = {
  addNewOrder,
  deleteOrder,
  getAllOrders,
  getUserOrders,
  changeOrderStatus
};