const model = require("../models/model.reviews");
const prdModel = require("../models/model.product");

const validator = require("../utiles/validators/validator.reviews");

let getReviewsByProductID = async (req, res) => {
  try {
    let result = await model.find({
      productId: { $in: [req.params.productId] },
    });
    result.length > 0
      ? res.status(200).json({ status: "success", data: result })
      : res.status(200).json({
          status: "success",
          message: `No Reviews Found in ${req.params.id} Product`,
        });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error.message });
  }
};

let addNewReview = async (req, res) => {
  let args = {
    userId: req.body.userId,
    productId: req.body.productId,
    comment: req.body.comment,
    rate: req.body.rate,
  };

  try {
    if (validator(args)) {
      // Find existing review by user and product ID
      let existingReview = await model.findOne({
        userId: args.userId,
        productId: args.productId,
      });

      // If existing review found, delete it and update product star rating
      if (existingReview) {
        await prdModel.updateOne(
          { _id: existingReview.productId },
          {
            $inc: {
              star: -existingReview.rate, // Decrement old rate from product star
              numberOfRates: -1 // Decrement the number of rates
            }
          }
        );

        await model.deleteOne({ _id: existingReview._id });
      }

      // Create new review
      let review = new model(args);
      await review.save();

      // Update product star rating and number of rates
      await prdModel.updateOne(
        { _id: args.productId },
        {
          $inc: {
            star: args.rate, // Increment by new rate
            numberOfRates: 1 // Increment the number of rates
          }
        },
        { upsert: true } // Create new product if it doesn't exist
      );

      return res.status(200).json({
        status: "success",
        message: "Review updated successfully",
        review,
      });
    } else {
      return res
        .status(400)
        .json({ status: "fail", message: validator.errors[0].message });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};


module.exports = {
  getReviewsByProductID,
  addNewReview,
};
