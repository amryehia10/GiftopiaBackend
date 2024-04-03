const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    image: { type: "string" },
    address: {
      type: "array",
      items: { type: "string" }
    },
    email: { type: "string", format: "email" },
    age: { type: "number", minimum: 15 },
    password: { type: "string" },
    phone: {
      type: "array",
      items: { type: "string" }
    },
    gender: { type: "string", enum: ["male", "female"] },
    userType: { type: "string", enum: ["admin", "customer"] }
  },
  required: ["name", "email", "password", "gender", "userType"],
  additionalProperties: false 
};

module.exports = ajv.compile(Schema);