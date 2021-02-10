import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import swaggerJsDocs from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import memeRoutes from "./routes/memes.js"

const app = express();
const PORT = 8081;

const swaggerApp = express();
const swaggerPORT = 8080;

const swaggerOptions = {
    definition: {
        info: {
            title: "Meme Stream API",
            description: "This is Meme Stream",
            contact: {
                name: "Soham Pal"
            }
        },
        host: "localhost:8081"
    },
    apis: ["./routes/*.js"]
};

app.use(cors());
swaggerApp.use(cors());

const swaggerDocs = swaggerJsDocs(swaggerOptions);
swaggerApp.use("/swagger-ui", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(bodyParser.json());

app.use("/memes", memeRoutes);

app.get("/", (request, response) => {
    response.send("Welcome to Meme Stream!!");
});

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}/`);
});

swaggerApp.listen(swaggerPORT, () => {
    console.log(`Swagger is running on http://localhost:${swaggerPORT}/swagger-ui`);
});