const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { swaggerDefinition } = require('./swaggerDefinitions');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookster API",
      version: "1.0.0",
      description: "API do sistema Bookster",
    },
    paths: swaggerDefinition, 
  },
  apis: ["./controllers/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
