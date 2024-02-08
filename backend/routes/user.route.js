import express from 'express';
import {test, updateUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

//create express router
const router = express.Router();

//create route for test
router.get('/', test);

//create route for update user
router.put('/:id', verifyToken, updateUser);

export default router;