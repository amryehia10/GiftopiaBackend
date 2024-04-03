const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    productId: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: ["userId", "productId"],
  additionalProperties: false 
};

module.exports = ajv.compile(Schema);