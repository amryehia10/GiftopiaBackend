const model = require("../models/model.order");
const prdModel = require("../models/model.product");
const pipe = require("../utiles/pipe.product.map");
const validator = require("../utiles/validators/validator.order");

let addNewOrder = async (req, res) => {
  try {
    const userId = req.body.userId;
    const status = req.body.status;
    const address = req.body.address;
    const items = req.body.items;
    const paymentMethod = req.body.paymentMethod;
    const args = {userId: userId, status: status, address: address, items: items, paymentMethod: paymentMethod};
    console.log("order",args)
    if (validator(args)) {
      let order = new model(args);
      await order.save();
      
      const result = await model.aggregate([
          {
              $match: { _id: order._id }
          },
          {
              $lookup: {
                  from: "products",
                  localField: "items.productId",
                  foreignField: "_id",
                  as: "result"
              }
          }
      ]);
      
      if (result.length > 0) {
          const items = result[0].items;
      
          for (const item of items) {
              const productId = item.productId;
              const soldQuantity = item.soldQuantity;
      
              await prdModel.updateOne(
                  { _id: productId },
                  { $inc: { quantity: -soldQuantity } }
              );
          }
      }
      

      res.status(200).json({ status: "success", message: "Order is added successfully" });
    } else {
      res.status(404).json({ status: "fail", message: validator.errors[0].message });
    }
  } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }

}

let getAllOrders = async (req, res) => {
  try {
    const result = await model.aggregate([...pipe("items.productId", "_id")]);
    result ?
      res.json({ status: "success", data: result })
      : res.status(404).json({ status: "fail", message: "Error Happened" });
  } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }

}

let getUserOrders = async (req, res) => {
  try {
    console.log(req.params)
    console.log(req.params.userId)
    const result = await model.aggregate([
      {
        $match: {
          userId: req.params.userId
        }
      },
      ...pipe("items.productId", "_id")]
    );
    result ?
      res.json({ status: "success", data: result })
      : res.json({ status: "failed", msg: "No Orders Found for Required User" });
  } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }
}

let changeOrderStatus = async (req, res) => {
  try {
    let args = req.body;
    console.log(args)
    // if (validator(args)) {
      let result = await model.findOneAndUpdate(
        { _id: req.params.id, status: { $nin: ["cancel", "closed", "success"] } },
        { status: args.status },
        { new: true }
      );
      console.log(result)
      result ?
        res.status(200).json({ status: "success", msg: "Order Status Updated Successfully" })
        : res.status(404).json({ status: "fail", msg: "No Updates Happened fo Order" });
    // } else { res.status(404).json({ status: "fail", message: validator.errors[0].message }); }
  } catch (error) { res.status(500).json({ status: "fail", error: error.message }); }
};


// let deleteOrder = async (req, res) => {
//   try {
//     let args = req.body;

//     let result = await model.findOneAndUpdate({ _id: args._id }, { status: "Canceled" }, { new: true })
//     console.log(result)
//     result ?
//       res.status(200).json({ status: "success", message: "Order-Status is canceled successfully" })
//       : res.status(404).json({ status: "fail", message: "Error Happened" });

//   } catch (error) { res.status(404).json({ status: "fail", error: error.message }) }
// }
module.exports = {
  addNewOrder,
  // deleteOrder,
  getAllOrders,
  getUserOrders,
  changeOrderStatus
};