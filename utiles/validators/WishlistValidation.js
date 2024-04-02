const Ajv = require("ajv");
const ajv = new Ajv();

const wishlistSchema = {
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

module.exports = ajv.compile(wishlistSchema);