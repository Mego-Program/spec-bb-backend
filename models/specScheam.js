import mongoose from "mongoose";

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once("open", async function () {console.log("Connected to the database")});

const date = new Date();
const dateNew = date.toLocaleDateString()

const SpecScheama = new mongoose.Schema({
    projectId: String,
    date: {
        type : String,
        default: dateNew
    },
    status: {
        type: String,
        enum: ['active', 'In progress', 'Done'],
        default: 'active'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    },
    participants: [{
        type: String
    }],
    kpis: [/*{
        type: mongoose.Schema.Types.KpiScheama,
        required: true
    }*/]
});


const KpiScheama = new mongoose.Schema({
    discreptions: String,
    status: {
        type: String,
        enum: ['Todo', 'In progress', 'Done'],
        default: 'Todo'
    },
    option: {
        type: String,
        enum: ['with in', 'until'],
        required: true
    },
    days: {
        type: String, Number,
        required: true
    },
});


const Spec = mongoose.model('specs', SpecScheama, 'specs');
const Kpi = mongoose.model('kpi', KpiScheama, 'kpi');

export {Spec, Kpi};
