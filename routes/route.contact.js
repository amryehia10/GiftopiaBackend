const express = require('../packages/node_modules/express');
const router = express.Router();
const controller = require("../controllers/controller.contact");


router.get("/", controller.getAllTickets);
router.get("/:email", controller.getUserTickets);

router.post("/", controller.addNewTicket);

router.delete("/:id", controller.deleteTicket);





module.exports = router;
