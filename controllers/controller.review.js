const model = require("../models/model.reviews");
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
      // 1. Check for an existing review
      let existingReview = await model.findOne({
        userId: args.userId,
        productId: args.productId,
      });

      // 2. If a review exists, delete it
      if (existingReview) {
        await model.deleteOne({ _id: existingReview._id });
      }

      // 3. Create and save the new review
      let review = new model(args);
      await review.save(); // Use await here

      res.status(200).json({
        status: "success",
        message: "Review updated successfully", // More accurate message
        review,
      });
    } else {
      res
        .status(400)
        .json({ status: "fail", message: validator.errors[0].message });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = {
  getReviewsByProductID,
  addNewReview,
};
