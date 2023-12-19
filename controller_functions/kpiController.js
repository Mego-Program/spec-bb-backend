import Kpi from "../KPIModel.js"
import Spec from "../SpecModel.js"

const gettigAllKpis = async (req, res) => {
    try {
        const foundkpi = await Kpi.find()
    return res.json(foundkpi)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
}

const gettigAllKpisInSpec = async (req, res) => {
    try {
      const specId = req.params.id;
      const kpis = await Kpi.find({ specId });
      
      if (!kpis || kpis.length === 0) {
        return res.status(404).json({ message: 'kpis not found for this Spec' });
      }
  
      res.json({ kpis });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

const gettingOneKpiInSpec = async (req, res) => {
    try {
      const { specId, kpiId } = req.params;
      
      const kpi = await Kpi.findOne({ _id: kpiId, specId });
      
      if (!kpi) {
        return res.status(404).json({ message: 'kpi not found for this Spec' });
      }
  
      res.json({ kpi });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const insertExistingKpiInSpec = async (req, res) => {
    try {
      const { specId, kpiId } = req.params;
  
      const spec = await Spec.findById(specId);
      if (!spec) {
        return res.status(404).json({ message: 'Spec not found' });
      }
  
      const kpi = await Kpi.findById(kpiId);
      if (!kpi) {
        return res.status(404).json({ message: 'kpi not found' });
      }

      if (spec.kpi.includes(kpi._id)) {
        return res.status(400).json({ message: 'kpi is already associated with the Spec' });
      }
  
      spec.kpi.push(kpi._id);
      await spec.save();
  
      res.status(200).json({ message: 'kpi associated with Spec successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  const createKpiInSpec = async (req, res) => {
    const { specId } = req.params;

    try {
        const spec = await Spec.findById(specId);
        if (!spec) {
            return res.status(404).json({ message: 'Spec not found' });
        }

        const newKpi = new Kpi({
            mission: req.body.mission,
            option: req.body.option,
            date: req.body.date,
            spec: specId // Assigning the Spec ID to the KPI
        });

        const createdKpi = await newKpi.save();
        spec.kpis.push(createdKpi._id); // Assuming Spec has a field 'kpis' to store KPI IDs
        await spec.save();

        return res.status(201).json(createdKpi);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updatingOneKpi = async (req, res) => {
    if (req.body.mission != null) {
        res.geting.mission = req.body.mission
    }
    if (req.body.option != null) {
        res.geting.option = req.body.option
    }
    if (req.body.date != null) {
        res.getingkpi.date = req.body.date
    }
    try {
        const updatedkpi = await res.getingkpi.save()
        res.json(updatedkpi)
    } catch (err){
        res.status(400).json({massage: err.massage})
    }
}

const deletingOneKpi = async (req, res) => {
    try{
        await res.getingkpi.deleteOne()
        res.json({message: "Deleted kpi"})
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

const removeKpiReferenceFromSpec = async function(req, res, next) {
  try {
    const kpiId = req.params.id;
    await Spec.updateMany({ kpi: kpiId }, { $pull: { kpi: kpiId } });
    next();
  } catch (err) {
    next(err);
  }
};

export {gettigAllKpis, gettigAllKpisInSpec, gettingOneKpiInSpec,insertExistingKpiInSpec, createKpiInSpec, updatingOneKpi, deletingOneKpi, getKpi, removeKpiReferenceFromSpec}