import mongoose from "mongoose";
import Kpi from "./KPIModel.js"

const date = new Date()
const dateNew = (date.getDate() + "-" + parseInt(date.getMonth() + 1).toString() +"-" + date.getFullYear())

const specSchema = new mongoose.Schema({
    order: {
      type: Number,
      required: true 
    },
    title:  {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    date: { 
      type: Date, 
      // default: dateNew 
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Todo', 'In progress', 'Done'],
      required: true
    },
    Kpi: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kpi",
      required: true
    }],
    boardID: {
      type: String
    }
  });


const Spec = mongoose.model("Spec", specSchema);

export default Spec;