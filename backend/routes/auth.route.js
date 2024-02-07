import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';


//create express router 
const router = express.Router();

//create route for signup 
router.post('/signup', signup);
//create route for signin
router.post('/signin', signin);

export default router;