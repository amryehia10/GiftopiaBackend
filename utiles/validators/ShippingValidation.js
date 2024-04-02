const Ajv = require("ajv");
const ajv = new Ajv(); 

const shippingSchema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    orderId: { type: "string" },
    status: { type: "string" }
  },
  required: ["userId", "orderId", "status"],
  additionalProperties: false
};

module.exports =  ajv.compile(shippingSchema);