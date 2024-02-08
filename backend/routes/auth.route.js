import express from 'express';
import { signup, signin, signout, google } from '../controllers/auth.controller.js';


//create express router 
const router = express.Router();

//create route for signup 
router.post('/signup', signup);
//create route for signin
router.post('/signin', signin);
//create route for google signin
router.post('/google', google);
//create route for signout
router.get('/signout', signout);

export default router;