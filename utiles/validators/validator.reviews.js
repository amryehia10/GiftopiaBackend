const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    productId: { type: "string" },
    comment: { type: "string" },
    rate: { type: "number" }
  },
  required: ["userId", "productId", "comment", "rate"],
  additionalProperties: false 
};

module.exports = ajv.compile(Schema);