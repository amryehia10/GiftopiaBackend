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
        const orders = await model.aggregate([
          {
            $lookup: {
              from: cart.collection.name, // This should match the name of the collection MongoDB uses for carts
              localField: 'cartId', // The field in the Order collection
              foreignField: '_id', // The corresponding field in the Cart collection that matches localField
              as: 'cartDetails' // The array field where the matched documents from the Cart collection will be placed
            }
          },
          {
            $unwind: '$cartDetails' // If you are sure each order will have exactly one cart, you can use this to "flatten" the cartDetails array
          },
          {
            $lookup: {
              from: 'products', // Assuming 'products' is the name of your products collection
              localField: 'cartDetails.productId', // The array of productIds in the cart
              foreignField: '_id', // The _id field in the Product collection
              as: 'cartDetails.products' // Adding fetched products directly into the cartDetails object
            }
          }
        ]);
    
        console.log(orders);
        return orders;
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