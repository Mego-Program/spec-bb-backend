import Kpi from "../KPIModel.js"


const gettigAllKpis = async (req, res) => {
    try {
        const foundKpi = await Kpi.find()
    return res.json(foundKpi)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
}

const gettingOneKpi = async (req, res) => {
    try {
        const foundKpi = await Kpi.findById(req.params.id);
        if (!foundKpi) {
            return res.status(404).json({ message: "Cannot find kpi" });
        }
        return res.json(foundKpi);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const creattingOneKpi = async (req, res) => { 
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
}

const updatingOneKpi = async (req, res) => {
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
}

const deletingOneKpi = async (req, res) => {
    try{
        await res.getingkpi.deleteOne()
        res.json({message: "Deleted Kpi"})
    } catch (err){
        res.status(500).json({message: err.message })
    }
}

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
export {gettigAllKpis, gettingOneKpi, creattingOneKpi, updatingOneKpi, deletingOneKpi, getKpi}