import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors"
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
    gettigAllKpisInSpec,
    gettingOneKpiInSpec,
    createKpiInSpec,
    insertExistingKpiInSpec,
    updatingOneKpi,
    deletingOneKpi,
    getKpi,
    removeKpiReferenceFromSpec
} from "./controller_functions/kpiController.js"
dotenv.config();

mongoose.connect(process.env.DB_URL, { tlsAllowInvalidCertificates: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", async function () {console.log("Connected to the database")});

const app = express();
const port = 3000;
app.use(cors({ origin: 'http://localhost:5173' }));
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
// getting all kpis from specific spec
app.get("/spec/:id/kpi", gettigAllKpisInSpec);
// getting one kpi from specific spec
app.get("/spec/spec:id/kpi/kpi:id", getKpi, gettingOneKpiInSpec); 
// insert spec in kpi
app.post('/specs/:specId/kpi/:kpiId', createKpiInSpec);
// insert kpi in spec
app.post('/spec/:specId/kpis/:kpiId', insertExistingKpiInSpec);
// updating One kpi from specific spec
app.patch("/spec/spec:id/kpi/kpi:id", getKpi, updatingOneKpi);
// deleting One kpi
app.delete("/kpi/:id", getKpi, removeKpiReferenceFromSpec, deletingOneKpi);
// deleting One kpi from specific spec
app.delete("/spec/spec:id/kpi/kpi:id", getKpi, deletingOneKpi);

