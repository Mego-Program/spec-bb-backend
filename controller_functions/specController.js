import {Spec, Kpi} from "../models/specScheam.js";
import mongoose from "mongoose";
// import Spec from "../SpecModel.js";


const creatingSpecs = async (req, res) => {
    try {
        const data = new Spec(req.body);
        console.log(data)
        const result = await data.save();
        res.status(200).json({message:"spec created",data:req.body})
    } catch (error) {
        res.status(400).json({error:error})
    }
}

// const getSpec = async (req, res) => {
//     try {
//         console.log(req.params.id)
//         const spec = req.find(req.params.id)
//         console.log(spec)
//         res.status(200).json({data: spec})
//         return spec
//     } catch (error) {
//       res.status(400).json({error:error})
//     }
// }


const getAllSpecs = async (req=null, res) => {
    try {
        const allSpecsList = await Spec.find({});
        res.status(200).json({allSpecsList})
        return allSpecsList
    } catch (err) {
        res.status(500).json({message: err.message })
    }
}


const updatingSpec = async (req, res) => {
    let spec = getSpec(req.params.id)

    let title = req.body.title
    if (title) spec.title = title

    let content = req.body.content
    if (content) spec.content = content

    let status = req.body.status
    if (status) spec.status = status

    let participants = req.body.participants
    if (participants) spec.participants = participants

    let kpis = req.body.kpis
    if (kpis) spec.kpis = kpis

    try {
        const updatedSpec = await spec.save()
        res.json(updatedSpec)
    } catch (err){
        res.status(400).json({massage: err.massage})
    }
}

const deletingSpec = async (req, res) => {
    let spec = getSpec(req.params.id)
    try {
        const deletedSpec = await spec.delete()
        res.json(deletedSpec)
    } catch (err){
        res.status(400).json({massage: err.massage})
    }
}

export {creatingSpecs, getAllSpecs, updatingSpec, deletingSpec}




// const gettingOneSpec = async (req, res) => {
//     try {
//         const foundSpec = await Spec.findById(req.params.id).populate("Kpi");
//         if (!foundSpec) {
//             return res.status(404).json({ message: "Cannot find spec" });
//         }
//         return res.json(foundSpec);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }
//
// const creattingOneSpec = async (req, res) => {
//     const newSpec = new Spec({
//         order: req.body.order,
//         title: req.body.title,
//         content: req.body.content,
//         date: req.body.date,
//         status: req.body.status,
//         Kpi: req.body.Kpi,
//         participants: req.body.participants
//         })
//     try{
//         const createSpec = await newSpec.save()
//         return res.status(201).json(createSpec)
//     } catch (err) {
//         res.status(400).json({message: err.message})
//     }
// }
//
// const updatingOneSpec = async (req, res) => {
//     if (req.body.order != null) {
//         res.geting.order = req.body.order
//     }
//     if (req.body.title != null) {
//         res.geting.title = req.body.title
//     }
//     if (req.body.content != null) {
//         res.geting.content = req.body.content
//     }
//     if (req.body.date != null) {
//         res.geting.date = req.body.date
//     }
//     if (req.body.status != null) {
//         res.geting.status = req.body.status
//     }
//     if (req.body.Kpi != null) {
//         res.geting.Kpi = req.body.Kpi
//     }
//     if (req.body.boardID != null) {
//         res.geting.boardID = req.body.boardID
//     }
//     try {
//         const updatedSpec = await res.geting.save()
//         res.json(updatedSpec)
//     } catch (err){
//         res.status(400).json({massage: err.massage})
//     }
// }
//
// const deletingOneSpec = async (req, res) => {
//     try{
//         await res.geting.deleteOne()
//         res.json({message: "Deleted Spec"})
//     } catch (err){
//         res.status(500).json({message: err.message })
//     }
// }
//
// export {gettigAllSpecs, gettingOneSpec, creattingOneSpec, creatingSpecs, updatingOneSpec, deletingOneSpec, getSpec}