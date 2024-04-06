const model = require("../models/model.reviews");
const validator = require("../utiles/validators/validator.reviews");

let getReviewByID = async (req, res) => {
    try {
        let result = await model.findOne({ "_id": req.params.id });
        result ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: "No Reviews Found" });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error })
    }
}

let getReviewsByProductID = async (req, res) => {
    try {
        let result = await model.find({ "productId": { "$in": [req.params.id] } });
        result.length > 0 ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: `No Reviews Found in ${req.params.id} Product` });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

let addNewReview = async (req, res) => {
    try {
        let args = req.body;
        if (validator(args)) {
            let review = new model(args)
            review.save();
            res.status(200).json({ status: "success", message: "Review is added successfully" });
        }
        else {
            res.status(404).json({ status: "fail", message: validator.errors[0].message });
        }
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

module.exports = {
    getReviewByID,
    getReviewsByProductID,
    addNewReview,
}