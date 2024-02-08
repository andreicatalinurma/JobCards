import express from 'express';
import {test, updateUser, deleteUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

//create express router
const router = express.Router();

//create route for test
router.get('/', test);

//create route for update user
router.post('/update/:id', verifyToken, updateUser);

//create route for delete user
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;