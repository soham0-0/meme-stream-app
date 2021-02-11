import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import swaggerJsDocs from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import memeRoutes from "./routes/memes.js"

const app = express();
const PORT = process.env.PORT || 8081;


const swaggerOptions = {
    definition: {
        info: {
            title: "Meme Stream API",
            description: "This is Meme Stream",
            contact: {
                name: "Soham Pal"
            }
        },
        host: (
            process.env.NODE_ENV === "production" 
            ? "" : "localhost:8081"
        )
    },
    apis: ["./routes/*.js"]
};


app.use(cors());

const swaggerDocs = swaggerJsDocs(swaggerOptions);

if(process.env.NODE_ENV === "production") {
    //Rendering Static Client Side
    app.use(express.static("./client/build"));

    // Swagger Docs
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
} else {
    // Starting Swagger UI on Port 8080

    const swaggerApp = express();
    const swaggerPORT = 8080;
    
    swaggerApp.use(cors());
    swaggerApp.use("/swagger-ui", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    
    swaggerApp.listen(swaggerPORT, () => {
        console.log(`Swagger is running on http://localhost:${swaggerPORT}/swagger-ui`);
    });    
}

app.use(bodyParser.json());

app.use("/memes", memeRoutes);

app.get("/", (request, response) => {
    response.send("Welcome to Meme Stream!!");
});

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "client/build/"));
});

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}/`);
});