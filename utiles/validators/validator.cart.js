const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    cart: {
      type: "array",
      items: {
        type: "object",
        properties: {
          productId: { type: "string" },
          quantity: { type: "number" }
        },
        required: ["productId", "quantity"],
        additionalProperties: false
      }
    },
    total: {type: "number"},
    status:{type: "string"}

  },
  required: ["userId", "cart", "status", "total"],
  additionalProperties: false
};

module.exports = ajv.compile(Schema);