import {Spec, Kpi} from "../models/specScheam.js";




const saveSpec = async (req, res) => {
    try {
        const data = new Spec(req.body);
        const result = await data.save();
        res.status(200).json({message: "spec created", data: req.body})
    } catch (error) {
        res.status(400).json({error:error})
    }
}

const getAllSpecs = async (req=null, res) => {
    try {
        const allSpecsList = await Spec.find({});
        res.status(200).json({allSpecsList})
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

const creatingSpec = (req, res) => {
    const newSpec = new Spec
    res.status(200).json({newSpec})
    return newSpec
}

const creatingKpis = (req, res) => {
    const newKpi = new Kpi
    res.status(200).json({newKpi})
    return newKpi
}

export {creatingSpec, creatingKpis, getAllSpecs, saveSpec, deletingSpec}




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