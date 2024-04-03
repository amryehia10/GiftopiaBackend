const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv(); 

const Schema = {
  type: "object",
  properties: {
    name:{type:"string",pattern:"^[a-zA-Z]*$"},
    email: { type: "string", pattern:"^[a-zA-Z0-9]@[a-zA-Z]{4,}\.[a-zA-Z]{3,}*$"},
    message: { type: "string" },
  },
  required: ["name", "email", "message"],
  additionalProperties: false,
};


module.exports = ajv.compile(Schema);
