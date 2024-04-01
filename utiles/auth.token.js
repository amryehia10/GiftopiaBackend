const token = require("../packages/node_modules/jsonwebtoken");
const secretKey = "dfm!@asdl;kdma*fnkqo@51#4ekwoq54elm$%da,fdsnkfg;wejmf,nk^15&ndkqml#nsdfnddnv"

let sign = async (data) => {
    console.log(data);
    let res = await token.sign(data, secretKey);
    console.log("Result is: ");
    console.log(res);
    return res;
}

let decode = async (authKey) => {
    console.log(`Token is: ${authKey}`)
    let res = await token.decode(authKey, secretKey)
    console.log(`Result is:`)
    console.log(res)

    return res;
}

module.exports = { sign, decode };