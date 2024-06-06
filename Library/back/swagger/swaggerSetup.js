import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerDefinition } from './swaggerDefinitions.js'; 

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookster API",
      version: "1.0.0",
      description: "API do sistema Bookster",
    },
    paths: swaggerDefinition,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./controllers/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
