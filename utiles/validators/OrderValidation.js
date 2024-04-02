const Ajv = require("ajv");
const ajv = new Ajv();

const orderSchema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    cartId: { type: "string" },
    status: { type: "string" },
    paymentMethod: { type: "string" },
    address: { type: "string" },
  },
  required: ["userId", "cartId", "status", "paymentMethod", "address"],
  additionalProperties: false,
};

module.exports = ajv.compile(orderSchema);

