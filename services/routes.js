import { Router } from "express";

import {creatingSpec, updatingSpec, creatingKpis, getAllSpecs,
    deletingSpec, statusChange} from "../controller_functions/specController.js"
import {users} from "../controller_functions/infraImport.js";


const router = Router();

router.get('/', getAllSpecs)
router.post('/save', creatingSpec)
router.post(`/update`, updatingSpec)
router.put('/status/:id', statusChange)
router.delete('/delete/:id', deletingSpec)

router.get('/kpi', creatingKpis)


router.get("/infraImport/allUsers", users);


export default router;