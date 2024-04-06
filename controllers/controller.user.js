const model = require("../models/model.user");
const validator = require("../utiles/validators/validator.user");


let getAllUsers = async (req, res) => {
    try {
        const result = await model.find({});
        result ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: "No Users Found" });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error })
    }
}

let getUserByID = async (req, res) => {
    try {
        let result = await model.findOne({ "_id": req.params.id });
        result ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: "No Users Found" });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error })
    }
}

module.exports = {
    getAllUsers,
    getUserByID,
}