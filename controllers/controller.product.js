const model = require("../models/model.product");
const validator = require("../utiles/validators/validator.product");


let getAllProducts = async(req, res)=>{
    console.log("getAllProducts");
    const result = await model.find({});
    res.status(200).json({data: result});
}

let getProductByCategory = async (req, res) => {
    const args = req.params.id;
    let result = await model.find({});
    console.log(result);
    res.status(200).json({data: result});
}

module.exports = {
    getAllProducts,
    getProductByCategory
}