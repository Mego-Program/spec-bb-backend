import { Router } from "express";

import {creatingSpec, creatingKpis, getAllSpecs, saveSpec, deletingSpec} from "../controller_functions/specController.js"
import {users} from "../controller_functions/infraImport.js";




const router = Router();

router.get('/', getAllSpecs)
router.get('/newspec', creatingSpec)
router.get('/kpi', creatingKpis)

router.post('/save', saveSpec)
router.delete('/delete/:id', deletingSpec)

router.get("/infraImport/allUsers", users);


export default router;




// import {
//     gettigAllSpecs,
//     gettingOneSpec,
//     creattingOneSpec,
//     creatingSpecs,
//     updatingOneSpec,
//     deletingOneSpec,
//     getSpec
// } from "./controller_functions/specController.js"
// import {
//     gettigAllKpis,
//     gettigAllKpisInSpec,
//     gettingOneKpiInSpec,
//     createKpiInSpec,
//     insertExistingKpiInSpec,
//     updatingOneKpi,
//     deletingOneKpi,
//     getKpi,
//     removeKpiReferenceFromSpec
// } from "./controller_functions/kpiController.js"


// app.post("/spec", creattingOneSpec);
// // updating One spec
// app.patch("/spec/:id", getSpec, updatingOneSpec);
// // deleting One spec
// app.delete("/spec/:id", getSpec, deletingOneSpec);
//// // getting all specs
// // app.get("/spec", gettigAllSpecs);
// // // getting one spec
// // app.get("/spec/:id", getSpec, gettingOneSpec);


// // getting all kpis
// app.get("/kpi", gettigAllKpis);
// // getting all kpis from specific spec
// app.get("/spec/:id/kpi", gettigAllKpisInSpec);
// // getting one kpi from specific spec
// app.get("/spec/spec:id/kpi/kpi:id", getKpi, gettingOneKpiInSpec);
// // insert spec in kpi
// app.post('/specs/:specId/kpi/:kpiId', createKpiInSpec);
// // insert kpi in spec
// app.post('/spec/:specId/kpis/:kpiId', insertExistingKpiInSpec);
// // updating One kpi from specific spec
// app.patch("/spec/spec:id/kpi/kpi:id", getKpi, updatingOneKpi);
// // deleting One kpi
// app.delete("/kpi/:id", getKpi, removeKpiReferenceFromSpec, deletingOneKpi);
// // deleting One kpi from specific spec
// app.delete("/spec/spec:id/kpi/kpi:id", getKpi, deletingOneKpi);