import express from 'express';
import { 
    getjobs, 
    strikejob, 
    deletejob,
    submitjob 
} from '../controllers/job.controller.js';

const router = express.Router();   


//router.post('/createjob', createjob);

router.get('/getjobs', getjobs);

router.post('/strikejob/:id', strikejob);

router.delete('/deletejob/:id', deletejob);

router.post('/submitjob', submitjob);

export default router;