const token = require("../node_modules/jsonwebtoken");
const { JWT: JWTCongig } = require("../config.json");

let sign = async (data) => {
    console.log(data);
    let res = await token.sign(data, JWTCongig.secretKey);
    console.log("Result is: ");
    console.log(res);
    return res;
}

let decode = async (authKey) => {
    console.log(`Token is: ${authKey}`)
    let res = await token.decode(authKey, JWTCongig.secretKey)
    console.log(`Result is:`)
    console.log(res)

    return res;
}

module.exports = { sign, decode };