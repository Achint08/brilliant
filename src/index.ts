import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();


    // Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional 
    // HTTP headers to tell a browser to let a web application running at one origin 
    //(domain) have permission to access selected resources from a server at a different origin.
    // Default Options: {
    //      "origin": "*",
    //      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    //      "preflightContinue": false,
    //      "optionsSuccessStatus": 204
    //  }
    app.use(cors());

    // Helmet helps you secure your Express apps by setting various HTTP headers 
    // and safeguarding from attacks
    // Refer docs: https://helmetjs.github.io/
    app.use(helmet());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //Set all routes from routes folder
    app.use("/", routes);

    // Listens to port 3000
    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));
