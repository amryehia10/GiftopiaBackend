const Ajv = require("../../packages/node_modules/ajv/dist/ajv");
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    name: { type: "string", pattern: "^[a-zA-Z]*$" },
    email: { type: "string", pattern: "^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$" },
    message: { type: "string" },
  },
  required: ["name", "email", "message"],
  additionalProperties: false,
};


module.exports = ajv.compile(Schema);
