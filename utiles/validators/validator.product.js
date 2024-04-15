const Ajv = require("../../node_modules/ajv");
const ajv = new Ajv(); 

const Schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    desc: { type: "string" },
    createdAt: {type: "string"},
    images: {
      type: "array",
      items: { type: "string" }
    },
    cat: {
      type: "array",
      items: { type: "string" }
    },
    star: { type: "number" },
    price: { type: "number" },
    quantity: { type: "number" },
    discount: { type: "number" },
    numberOfRates: { type: "number" },
    numberOfSellings: { type: "number" },
  },
  required: ["name", "images", "cat", "desc", "star", "price", "quantity", "discount", "numberOfSellings", "numberOfRates", "createdAt"],
  additionalProperties: false 
};

module.exports = ajv.compile(Schema);