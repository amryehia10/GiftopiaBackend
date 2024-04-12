const Ajv = require("../../node_modules/ajv");
const ajv = new Ajv(); 

const Schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    image: { type: "string" },
  },
  required: ["name", "image"],
  additionalProperties: false,
};


module.exports = ajv.compile(Schema);
