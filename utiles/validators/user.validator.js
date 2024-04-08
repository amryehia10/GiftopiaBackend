const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    name: { type: "string" },
    image: { type: "string" },
    address: {
      type: "array",
      items: { type: "string" },
    },
    email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
    age: { type: "integer", minimum: 0 },
    password: { type: "string" },
    phone: {
      type: "array",
      items: { type: "string" },
    },
    gender: { type: "string", enum: ["male", "female", "other"] },
    userType: { type: "string", enum: ["customer", "admin", "staff"] },
  },
  required: ["_id"],
  additionalProperties: false,
};

module.exports = ajv.compile(Schema);
