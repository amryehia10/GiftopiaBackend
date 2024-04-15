const model = require("../models/model.product");
const validator = require("../utiles/validators/validator.product");

let getAllProducts = async (req, res) => {
  try {
    const result = await model.find({});
    result
      ? res
          .status(200)
          .json({ status: "success", length: result.length, data: result })
      : res
          .status(200)
          .json({ status: "success", message: "No Products Found" });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error });
  }
};

let getProductByID = async (req, res) => {
  try {
    let result = await model.findOne({ _id: req.params.id });
    result
      ? res.status(200).json({ status: "success", data: result })
      : res
          .status(200)
          .json({ status: "success", message: "No Products Found" });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error });
  }
};

const getProductsByKeyword = async (req, res) => {
  try {
    let result = await model.find({
      name: { $regex: new RegExp(req.params.keyword, "i") },
    });
    console.log(result);
    result.length > 0
      ? res.status(200).json({ status: "success", data: result })
      : res
          .status(200)
          .json({ status: "success", message: "No Products Found" });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error });
  }
};

let getOldProducts = async (req, res) => {
  try {
    let arrivalDate = new Date();
    arrivalDate.setDate(arrivalDate.getDate() - 14);
    let result = await model.find({
      createdAt: {
        $lte: arrivalDate.toISOString(),
      },
    });
    result
      ? res
          .status(200)
          .json({ status: "success", length: result.length, data: result })
      : res
          .status(200)
          .json({ status: "success", message: "No Products Found" });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error });
  }
};
let getNewArrivalProducts = async (req, res) => {
  try {
    let arrivalDate = new Date();
    arrivalDate.setDate(arrivalDate.getDate() - 14);
    let result = await model.find({
      createdAt: {
        $gte: arrivalDate.toISOString(),
        $lte: new Date().toISOString(),
      },
    });
    result
      ? res
          .status(200)
          .json({ status: "success", length: result.length, data: result })
      : res
          .status(200)
          .json({ status: "success", message: "No Products Found" });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error });
  }
};

let getProductsByCategory = async (req, res) => {
  try {
    let result = await model.find({ cat: { $in: [req.params.id] } });
    result.length > 0
      ? res.status(200).json({ status: "success", data: result })
      : res.status(200).json({
          status: "success",
          message: `No Products Found in ${req.params.id} Category`,
        });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error.message });
  }
};

let addNewProduct = async (req, res) => {
  try {
    let args = req.body;
    delete args['headers'];;
    if (validator(args)) {
      let prd = new model(args);
      prd.save();
      res.status(200).json({
        status: "success",
        message: "Ticket is added successfully",
        data: prd,
      });
    } else {
      res
        .status(404)
        .json({ status: "fail", message: validator.errors[0].message });
    }
  } catch (error) {
    res.status(404).json({ status: "fail", error: error.message });
  }
};

let updateProduct = async (req, res) => {
  console.log("Update");
  console.log(req.body);
  try {
    let prd = req.body;
<<<<<<< HEAD
    delete prd['headers'];
=======
    console.log(prd);
    let { cat, name, desc, star, price, images, discount, quantity,  } = req.body; // Assuming name and image can be updated

>>>>>>> c7cc077230d056f40a919750747077b89e451730
    if (validator(prd)) {
      let result = await model.findOneAndUpdate(
        { _id: req.params.id },
          prd
        ,
        { new: true }
      );
      console.log(result);
      result
        ? res.json({
            status: "success",
            msg: "Product is updated successfully",
            data: result,
          })
        : res.json({
            status: "failed",
            msg: `No Product found with this id: ${prd.id}`,
          });
    } else {
      res
        .status(404)
        .json({ status: "fail", message: validator.errors[0].message });
    }
  } catch (error) {
    res.status(404).json({ status: "fail", error: error.message });
  }
};

let deleteProduct = async (req, res) => {
  try {
    let prd = await model.deleteOne({ _id: req.params.id });
    prd.deletedCount
      ? res.status(200).json({
          status: "success",
          message: "Product is deleted successfully",
          data: prd,
        })
      : res.json({
          status: "failed",
          msg: `No ticket found with id: ${req.params.id}`,
        });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error.message });
  }
};

module.exports = {
  addNewProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductByID,
  getOldProducts,
  getProductsByCategory,
  getNewArrivalProducts,
  getProductsByKeyword,
};
