const model = require("../models/model.product");
const validator = require("../utiles/validators/validator.product");


let getAllProducts = async (req, res) => {
    try {
        const result = await model.find({});
        result ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: "No Products Found" });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error })
    }
}

let getProductByID = async (req, res) => {
    try {
        console.log(req.params);
        let result = await model.findOne({ "_id": req.params.id });
        result ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: "No Products Found" });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error })
    }
}

let getProductByCategory = async (req, res) => {
    try {
        let result = await model.find({ "cat": { "$in": [req.params.id] } });
        result.length > 0 ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: `No Products Found in ${req.params.id} Category` });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

module.exports = {
    getAllProducts,
    getProductByID,
    getProductByCategory
}