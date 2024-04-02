const model = require("../models/model.product");
const validator = require("../model/user/validator.product");

let getProductByCategory = async (req, res) => {
    const args = req.params.id;
    console.log(args);
    let result = await model.find();
    res.status(200).json({data: result});
}
module.exports = {
    getProductByCategory
}