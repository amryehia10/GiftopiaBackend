const model = require("../models/model.category");
const validator = require("../utiles/validators/validator.category");


let getAllCategories = async (req, res) => {
    try {
        const result = await model.find({});
        result ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: "No Categories Found" });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

let getCategoryByID = async (req, res) => {
    try {
        let result = await model.findOne({ "_id": req.params.id });
        result ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: "No Category Found" });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

let addNewCategory = async (req, res) => {
    try {
        let args = req.body;
        console.log(args)
        if (validator(args)) {
            let cat = new model(args)
            await cat.save();
            res.status(200).json({ status: "success", message: "Category is added successfully" });
        } else {
            res.status(404).json({ status: "fail", message: validator.errors[0].message });
        }
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

let updateCategory = async (req, res) => {
    try {
        let cat = req.body;
        if (validator(args)) {
            let result = await model
                .findOneAndUpdate(
                    { id: cat.id },
                    { image: cat.image, name: cat.name },
                    { new: true }
                );
            console.log(result);
            result ?
                res.json({ status: "success", msg: "Category is updated successfully", data: result })
                : res.json({ status: "failed", msg: `No Category found with this id: ${cat.id}` });
        }
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

let deleteCategory = async (req, res) => {
    try {
        let cat = await model.deleteOne({ "_id": req.params.id })
        cat.deletedCount ?
            res.status(200).json({ status: "success", message: "Category is deleted successfully", data: cat })
            : res.json({ status: "failed", msg: `No Category found with id: ${req.params.id}` });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}
module.exports = {
    deleteCategory,
    updateCategory,
    addNewCategory,
    getCategoryByID,
    getAllCategories,
}