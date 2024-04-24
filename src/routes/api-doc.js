const { Router } = require("express");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const router = Router();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.1.0",
        info: {
            version: "1.0.0",
            title: "Prueba técnica. Disruptive Studio",
            description: "Documentación de la API",
        },
        basePath: "/",
    },
    apis: [`${path.join(__dirname, "/*.js")}`],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = router;