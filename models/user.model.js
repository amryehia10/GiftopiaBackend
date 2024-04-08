const database = require("../utiles/handler.database");

let Schema = new database.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: [
    {
      type: String,
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: [
    {
      type: String,
    },
  ],
  gender: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
});

module.exports = database.model("User", Schema);
