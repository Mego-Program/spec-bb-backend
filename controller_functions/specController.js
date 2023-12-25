import Spec from "../SpecModel.js";


const gettigAllSpecs = async (req, res) => {
    try {
        const foundSpecs = await Spec.find()
    return res.json(foundSpecs)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
}

const gettingOneSpec = async (req, res) => {
    try {
        const foundSpec = await Spec.findById(req.params.id).populate("Kpi");
        if (!foundSpec) {
            return res.status(404).json({ message: "Cannot find spec" });
        }
        return res.json(foundSpec);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const creattingSpec = async (req, res) => {
    const newSpec = new Spec({
        order: req.body.order,
        title: req.body.title,   
        content: req.body.content,
        date: req.body.date,
        status: req.body.status,
        Kpi: req.body.Kpi,
        participants: req.body.participants
        })
    try{
        const createSpec = await newSpec.save()
        return res.status(201).json(createSpec)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const updatingOneSpec = async (req, res) => {
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
}

const deletingOneSpec = async (req, res) => {
    try{
        await res.geting.deleteOne()
        res.json({message: "Deleted Spec"})
    } catch (err){
        res.status(500).json({message: err.message })
    }
}

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
export {gettigAllSpecs, gettingOneSpec, creattingSpec, updatingOneSpec, deletingOneSpec, getSpec}