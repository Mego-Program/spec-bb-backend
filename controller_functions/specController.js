import {Spec, Kpi} from "../models/specScheam.js";


const getAllSpecs = async (req, res) => {
    try {
        const allSpecsList = await Spec.find({});
        res.status(200).json({data: allSpecsList})
        return allSpecsList
    } catch (err) {
        res.status(500).json({message: err.message })
    }
}

const deletingSpec = async (req, res) => {
    try {
        const deletedSpec = await Spec.findByIdAndDelete(req.params.id);
        if (!deletedSpec) {
            return res.status(404).json({message: "Cannot find spec"});
        }
        console.log("This is deleted spec", deletedSpec)
        return res.json(deletedSpec);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const creatingSpec =async (req, res) => {
    try {
        const data = new Spec(req.body);
        const result = await data.save();
        res.status(200).json({message: "spec created", data: req.body})
    } catch (error) {
        res.status(400).json({error:error})
    }
}

const updatingSpec = async (req, res) => {
    try {
        const result = await Spec.replaceOne({_id: req.body._id}, req.body);
        res.status(200).json({message: "spec updated", data: req.body})
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error})
    }
}

const statusChange = async (req, res) => {
    const result = await Spec.updateOne({_id: req.params.id}, {$set: {status: req.body.status}});
    res.status(200).json({message: "status updated", data: result})
}

const creatingKpis = (req, res) => {
    const newKpi = new Kpi
    res.status(200).json({newKpi})
    return newKpi
}

export {creatingKpis, getAllSpecs, creatingSpec, updatingSpec, deletingSpec, statusChange}
