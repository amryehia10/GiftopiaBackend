const product = require("../models/model.product");
const category = require("../models/model.category");
const order = require("../models/model.order");
const ticket = require("../models/model.ticket");
const user = require("../models/model.user");

let getDashoard = async (req, res) => {
    let users = await user.find({}).count();
    let orders = await order.find({}).count();
    let tickets = await ticket.find({}).count();
    let products = await product.find({}).count();
    let categories = await category.find({}).count();
    res.json({ products, categories, orders, tickets, users });
}

module.exports = { getDashoard };
