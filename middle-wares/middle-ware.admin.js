const token = require("../utiles/auth.token")

let checkAdminStatus = async (req, res, next) => {
    let body = await token.decode(req.headers.authorization);
    console.log(body);
    body.isAdmin ?
        next() :
        res.status(400).json({ status: "faild", msg: "not allowed" });
}
module.exports = checkAdminStatus;