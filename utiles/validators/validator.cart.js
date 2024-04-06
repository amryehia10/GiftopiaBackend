const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    productId: {
      type: "array",
      items: { type: "string" }
    },
    quantity: {
      type: "array",
      items:  { type: "number" }
    },
    total: {type: "number"}

  },
  required: ["userId", "productId", "quantity", "total"],
  additionalProperties: false
};

module.exports = ajv.compile(Schema);