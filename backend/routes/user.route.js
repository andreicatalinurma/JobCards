import express from 'express';
import {test} from '../controllers/user.controller.js'

//create express router
const router = express.Router();

//create route for test
router.get('/', test);

export default router;