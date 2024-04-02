const Ajv = require("ajv");
const ajv = new Ajv(); 

const productSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    images: {
      type: "array",
      items: { type: "string" }
    },
    cat: {
      type: "array",
      items: { type: "string" }
    },
    desc: { type: "string" },
    star: { type: "number" },
    price: { type: "number" },
    quantity: { type: "number" },
    discount: { type: "number" },
    numberOfSellings: { type: "number" },
    numberOfRates: { type: "number" }
  },
  required: ["name", "images", "cat", "desc", "star", "price", "quantity", "discount", "numberOfSellings", "numberOfRates"],
  additionalProperties: false 
};

module.exports = ajv.compile(productSchema);