const Ajv = require("../../node_modules/ajv");
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    status: { type: "string" },
    address: { type: "string" },
    paymentMethod: { type: "string" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          productId: { type: "string" },
          soldQuantity: { type: "number" }
        },
        required: ["productId", "soldQuantity"],
        additionalProperties: false
      }
    },
  },
  required: ["userId", "items", "status", "paymentMethod", "address"],
  additionalProperties: false,
};

module.exports = ajv.compile(Schema);

