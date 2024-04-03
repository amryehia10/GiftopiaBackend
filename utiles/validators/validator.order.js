const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv();

const Schema = {
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

module.exports = ajv.compile(Schema);

