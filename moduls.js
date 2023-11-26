import mongoose from "mongoose";


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
      default: dateNew 
      //default: Date.now
    },
    status: {
      type: String,
      enum: ['Todo', 'In progress', 'Done'],
      required: true
    },
    // KPI: {
    //   type: mongoose.Types.ObjectId, ref: "KPI",
    //   required: true
    // },
    boardID: {
      type: String
    }
  });

// const KPIchema = new mongoose.Schema({
//     mission: {
//       type: String,
//       required: true
//     },
//     option:{
//       type: String, Number,
//       enum: ['within', 'In progress', 'Done'],
//       required: true
//     } 
//   });

  const Spec = mongoose.model("Spec", specSchema);
  // const KPI = mongoose.model("KPI", KPIchema);

export default Spec;