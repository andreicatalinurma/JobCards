import express from 'express';
import { 
    getjobs, 
    strikejob, 
    deletejob,
    submitjob,
    updatejob, 

} from '../controllers/job.controller.js';

const router = express.Router();   

//create route to get all jobs
router.get('/getjobs', getjobs);
//create route to update job status
router.post('/strikejob/:id', strikejob);
//create route to delete job
router.delete('/deletejob/:id', deletejob);
//create route to submit job
router.post('/submitjob', submitjob);
//create route to update job title and details
router.post('/updatejob/:id', updatejob);



export default router;