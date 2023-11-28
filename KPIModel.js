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
    deta:{
      type: String, Number,
      required: true
    }
  });

const Kpi = mongoose.model("Kpi", KPISchema);

export default Kpi;