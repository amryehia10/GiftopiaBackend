const model = require("../models/model.ticket");
const validator = require("../utiles/validators/validator.ticket");

let getAllTickets = async (req, res) => {
    try {
        const result = await model.find({}, { "__v": 0 });
        result ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: "No Tickets Found" });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

let getUserTickets = async (req, res) => {
    try {
        const result = await model.find({ "userEmail": req.params.email }, { "message": 1 });
        result ?
            res.status(200).json({ status: "success", data: result })
            : res.status(200).json({ status: "success", message: "No Tickets Found" });
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

let addNewTicket = async (req, res) => {
    try {
        let args = req.body;
        console.log(args);
        if (validator(args)) {
            let ticket = new model(args)
            ticket.save();
            res.status(200).json({ status: "success", message: "Ticket is added successfully" });
        } else {
            res.status(404).json({ status: "fail", message: validator.errors[0].message });
        }
    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }

}

let deleteTicket = async (req, res) => {
    try {

        let ticket = await model.deleteOne({ "_id": req.params.id })

        ticket.deletedCount ?
            res.status(200).json({ status: "success", message: "Ticket is deleted successfully", data: ticket })
            : res.json({ status: "failed", msg: `No ticket found with id: ${req.params.id}` });

    } catch (error) {
        res.status(404).json({ status: "fail", error: error.message })
    }
}

module.exports = {
    addNewTicket,
    deleteTicket,
    getAllTickets,
    getUserTickets
}