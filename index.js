import express from "express";
import bodyParser from "body-parser";
import connectDB from "./services/ConnectDB.js";
import routes from "./services/routes.js";
import cors from "cors"

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(/*{ origin: 'http://localhost:5173' }*/));

connectDB();

app.use("/spec", routes);

export default app;
