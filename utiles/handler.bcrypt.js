const bcrypt = require("../packages/node_modules/bcrypt");
let salt = bcrypt.genSaltSync(10);

let hash = (pass) => {
    return bcrypt.hashSync(pass, salt);
}
let compare = (pass, hash)=>{
    return bcrypt.compareSync(pass, hash);
}

module.exports={hash, compare}