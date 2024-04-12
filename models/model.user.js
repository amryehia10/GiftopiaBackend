const database = require("../utiles/handler.database");

let Schema = new database.Schema(
  {
    name: String,
    image: String,
    address: [
      {
        type: String,
      },
    ],
    email: String,
    age: Number,
    password: String,
    phone: [
      {
        type: String,
      },
    ],
    gender: String,
    userType: String,
    disabled: Boolean,
  },
  { _id: true, strict: false }
);

module.exports = database.model("Users", Schema);
