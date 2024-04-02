const Ajv = require("../../packages/node_modules/ajv");
const ajv = new Ajv(); 

const categorySchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    categoryName: { type: "string" },
    categoryImage: { type: "string" },
  },
  required: ["categoryName", "categoryImage"],
  additionalProperties: false,
};


module.exports = ajv.compile(categorySchema);
