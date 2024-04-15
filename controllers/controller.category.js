const model = require("../models/model.category");
const prdModel = require("../models/model.product");
const validator = require("../utiles/validators/validator.category");

let getAllCategories = async (req, res) => {
  try {
    // const result = await model.find({});
    const result = await model.aggregate([
      {
        $project: {
          name_lower: { $toLower: "$name" },
          image: 1,
          _id: 1,
        },
      },
      {
        $lookup: {
          from: "products",
          let: { category_name: "$name_lower" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    "$$category_name",
                    {
                      $map: { input: "$cat", as: "c", in: { $toLower: "$$c" } },
                    },
                  ],
                },
              },
            },
          ],
          as: "products",
        },
      },
      {
        $project: {
          _id: 1,
          name: "$name_lower",
          image: 1,
          products: { $size: "$products" },
        },
      },
    ]);
    result
      ? res.status(200).json({ status: "success", data: result })
      : res
          .status(200)
          .json({ status: "success", message: "No Categories Found" });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error.message });
  }
};

let getCategoryByID = async (req, res) => {
  try {
    let result = await model.findOne({ _id: req.params.id });
    result
      ? res.status(200).json({ status: "success", data: result })
      : res
          .status(200)
          .json({ status: "success", message: "No Category Found" });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error.message });
  }
};

let addNewCategory = async (req, res) => {
  try {
    let args = req.body;
    console.log(args);
    if (validator(args)) {
      let cat = new model(args);
      await cat.save();
      res.status(200).json({
        status: "success",
        message: "Category is added successfully",
        data: cat,
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

let updateCategory = async (req, res) => {
  try {
    let { id, name, image } = req.body; // Assuming name and image can be updated
    let old = await model.findOne({ _id: id });
    if (!old) {
      return res
        .status(404)
        .json({ status: "fail", msg: `No category found with this id: ${id}` });
    }
    let updatedCategory = await model.findOneAndUpdate(
      { _id: id },
      { $set: { name, image } }, // Only update the fields that are provided
      { new: true }
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .json({ status: "fail", msg: `No category found with this id: ${id}` });
    }

    // Update the related products in the products collection
    let isSuccess = await prdModel.updateMany(
      { cat: { $in: [old.name] } },
      { $set: { "cat.$": updatedCategory.name } },
      { new: true }
    );

    if (isSuccess) {
      return res.json({
        status: "success",
        msg: "Category and related products updated successfully",
        data: updatedCategory,
      });
    } else {
      return res
        .status(500)
        .json({ status: "fail", msg: "Failed to update related products" });
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", error: error.message });
  }
};

let deleteCategory = async (req, res) => {
  try {
    let cat = await model.deleteOne({ _id: req.params.id });
    cat.deletedCount
      ? res.status(200).json({
          status: "success",
          message: "Category is deleted successfully",
          data: cat,
        })
      : res.json({
          status: "failed",
          msg: `No Category found with id: ${req.params.id}`,
        });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error.message });
  }
};
module.exports = {
  deleteCategory,
  updateCategory,
  addNewCategory,
  getCategoryByID,
  getAllCategories,
};
