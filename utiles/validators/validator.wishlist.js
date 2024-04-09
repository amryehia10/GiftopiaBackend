const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    products: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: ["userId", "products"],
  additionalProperties: false 
};

module.exports = ajv.compile(Schema);