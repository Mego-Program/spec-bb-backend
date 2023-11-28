import express from "express";
import mongoose from "mongoose";
import Spec from "./SpecModel.js";
import Kpi from "./KPIModel.js"
import dotenv from 'dotenv';
dotenv.config();

const url = "mongodb+srv://sw0583227258:TXfPeaUTNrCJQv02@cluster0.emkfwut.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(//process.env.URL//
url, { tlsAllowInvalidCertificates: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once("open", async function () {
  console.log("Connected to the database!");
});
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json())


// getting all
app.get("/spec", async (req, res) => {
    try {
        const foundSpecs = await Spec.find()
    return res.json(foundSpecs)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
});

app.get("/spec/:id", getSpec, async (req, res) => {
    try {
        const foundSpec = await Spec.findById(req.params.id).populate("Kpi");
        if (!foundSpec) {
            return res.status(404).json({ message: "Cannot find spec" });
        }
        return res.json(foundSpec);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// creating One
app.post("/spec", async (req, res) => { 
    const newSpec = new Spec({
        order: req.body.order,
        title: req.body.title,   
        content: req.body.content,
        createDate: req.body.createDate,
        status: req.body.status,
        Kpi: req.body.Kpi
        })
    try{
        const createSpec = await newSpec.save()
        return res.status(201).json(createSpec)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    });

// updating One
app.patch("/spec/:id", getSpec, async (req, res) => {
    if (req.body.order != null) {
        res.geting.order = req.body.order
    }
    if (req.body.title != null) {
        res.geting.title = req.body.title
    }
    if (req.body.content != null) {
        res.geting.content = req.body.content
    }
    if (req.body.date != null) {
        res.geting.date = req.body.date
    }
    if (req.body.status != null) {
        res.geting.status = req.body.status
    }
    if (req.body.Kpi != null) {
        res.geting.Kpi = req.body.Kpi
    }
    if (req.body.boardID != null) {
        res.geting.boardID = req.body.boardID
    }
    try {
        const updatedSpec = await res.geting.save()
        res.json(updatedSpec)
    } catch (err){
        res.status(400).json({massage: err.massage})
    }
    });

// deleting One
app.delete("/spec/:id", getSpec, async (req, res) => {
    try{
        await res.geting.deleteOne()
        res.json({message: "Deleted Spec"})
    } catch (err){
        res.status(500).json({message: err.message })
    }
    });

async function getSpec(req, res, next){
    let geting
    try {
        geting = await Spec.findById(req.params.id)
        if (geting === null){
            return res.status(404).json({message: "cannot find spec"})
        } 
    } catch (err){
        return res.status(500).json({message: err.message })
    }
    res.geting = geting
    next()
}





// getting all
app.get("/kpi", async (req, res) => {
    try {
        const foundKpi = await Kpi.find()
    return res.json(foundKpi)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
});

app.get("/kpi/:id", getKpi, async (req, res) => {
    res.json(res.getingkpi)
    });

// creating One
app.post("/kpi", async (req, res) => { 
    const newKpi = new Kpi({
        mission: req.body.mission,
        option: req.body.option,   
        deta: req.body.deta
        })
    try{
        const createKpi = await newKpi.save()
        return res.status(201).json(createKpi)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    });

// updating One
app.patch("/kpi/:id", getKpi, async (req, res) => {
    if (req.body.mission != null) {
        res.geting.mission = req.body.mission
    }
    if (req.body.option != null) {
        res.geting.option = req.body.option
    }
    if (req.body.deta != null) {
        res.getingkpi.deta = req.body.deta
    }
    try {
        const updatedKpi = await res.getingkpi.save()
        res.json(updatedKpi)
    } catch (err){
        res.status(400).json({massage: err.massage})
    }
    });

// deleting One
app.delete("/kpi/:id", getKpi, async (req, res) => {
    try{
        await res.getingkpi.deleteOne()
        res.json({message: "Deleted Kpi"})
    } catch (err){
        res.status(500).json({message: err.message })
    }
    });

async function getKpi(req, res, next){
    let getingkpi
    try {
        getingkpi = await Kpi.findById(req.params.id)
        if (getingkpi === null){
            return res.status(404).json({message: "cannot find kpi"})
        } 
    } catch (err){
        return res.status(500).json({message: err.message })
    }
    res.getingkpi = getingkpi
    next()
}