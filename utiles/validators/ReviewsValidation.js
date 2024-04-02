const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv();

const reviewSchema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    productId: { type: "string" },
    ReviewText: { type: "string" },
    rate: { type: "number" }
  },
  required: ["userId", "productId", "ReviewText", "rate"],
  additionalProperties: false 
};

module.exports = ajv.compile(reviewSchema);