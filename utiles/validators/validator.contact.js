const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    userName: { type: "string", pattern: "^[a-zA-Z]*$" },
    userEmail: { type: "string", pattern: "^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]{2,}$" },
    message: { type: "string" },
  },
  required: ["userName", "userEmail", "message"],
  additionalProperties: false,
};


module.exports = ajv.compile(Schema);
