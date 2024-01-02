import mongoose from "mongoose";


const KPISchema = new mongoose.Schema({
    mission: {
      type: String,
      required: true
    },
    option:{
      type: String,
      enum: ['with in', 'until'],
      required: true
    }, 
    date:{
      type: String, Number,
      required: true
    },
    spec: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Spec', 
    },
  });

const Kpi = mongoose.model("Kpi", KPISchema);

export default Kpi;