import express from "express";
import mongoose from "mongoose";
import Spec from "./moduls.js";
import dotenv from 'dotenv';
import e from "express";
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

// import router from './routes/subscribers.js';
// const subscribersRouter = router
// app.use('/subscribers', subscribersRouter)

// getting all
app.get("/", async (req, res) => {
    try {
        const foundSpecs = await Spec.find()
    return res.json(foundSpecs)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
});

app.get("/:id", getSpec, (req, res) => {
    res.json(res.geting)
    });

// creating One
app.post("/", async (req, res) => {
    const newSpec = new Spec({
        order: req.body.order,
        title: req.body.title,   
        content: req.body.content,
        createDate: req.body.createDate,
        status: req.body.status,
        // KPI: req.body.KPI
        })
    try{
        const createSpec = await newSpec.save()
        return res.status(201).json(createSpec)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    });

// updating One
app.patch("/:id", getSpec, async (req, res) => {
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
    // if (req.body.KPI != null) {
    //     res.geting.KPI = req.body.KPI
    // }
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
app.delete("/:id", getSpec, async (req, res) => {
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