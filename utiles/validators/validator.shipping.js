const Ajv = require("../../node_modules/ajv");
const ajv = new Ajv(); 

const Schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    orderId: { type: "string" },
    status: { type: "string" }
  },
  required: ["userId", "orderId", "status"],
  additionalProperties: false
};

module.exports =  ajv.compile(Schema);