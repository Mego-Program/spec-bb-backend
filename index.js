import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import {
    gettigAllSpecs,
    gettingOneSpec,
    creattingOneSpec,
    updatingOneSpec,
    deletingOneSpec,
    getSpec
} from "./controller_functions/specController.js"
import {
    gettigAllKpis,
    gettingOneKpi,
    creattingOneKpi,
    updatingOneKpi,
    deletingOneKpi,
    getKpi
} from "./controller_functions/kpiController.js"
dotenv.config();

mongoose.connect(process.env.URL, { tlsAllowInvalidCertificates: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", async function () {console.log("Connected to the database")});

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json())

// getting all specs
app.get("/spec", gettigAllSpecs);
// getting one spec
app.get("/spec/:id", getSpec, gettingOneSpec);
// creating One spec
app.post("/spec", creattingOneSpec);
// updating One spec
app.patch("/spec/:id", getSpec, updatingOneSpec);
// deleting One spec
app.delete("/spec/:id", getSpec, deletingOneSpec);


// getting all kpis
app.get("/kpi", gettigAllKpis);
// getting one kpi
app.get("/kpi/:id", getKpi, gettingOneKpi);
// creating One kpi
app.post("/kpi", creattingOneKpi);
// updating One kpi
app.patch("/kpi/:id", getKpi, updatingOneKpi);
// deleting One kpi
app.delete("/kpi/:id", getKpi, deletingOneKpi);

