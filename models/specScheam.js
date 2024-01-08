import mongoose from "mongoose";

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
        enum: ['active', 'In process', 'Done'],
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
    description: String,
    status: {
        type: String,
        enum: ['Todo', 'In process', 'Done'],
        default: 'Todo'
    },
    option: {
        type: String,
        enum: ['with in', 'until'],
        default: 'until',
    },
    days: {
        type: Number, String,
        default: 0,
        required: true,
    },
    period: {
        type: String,
        enum: ['Days', 'Weeks', 'Months'],
        default: 'Days',
    }
});

const Spec = mongoose.model('specs', SpecScheama, 'specs');
const Kpi = mongoose.model('kpi', KpiScheama, 'kpi');

export {Spec, Kpi};
