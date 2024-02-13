import express from 'express';
import { getjobs, strikejob, deletejob } from '../controllers/job.controller.js';

const router = express.Router();   


//router.post('/createjob', createjob);

router.get('/getjobs', getjobs);

router.post('/strikejob/:id', strikejob);

router.delete('/deletejob/:id', deletejob);


export default router;