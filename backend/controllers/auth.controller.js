import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    //get username, email and password from request body
    const { username, email, password } = (req.body);
    //create hashed password with 10 rounds of salt
    const hashedPassword = bcryptjs.hashSync(password, 10);
    //create new user with username, email and hashed password
    const newUser = new User({ username, email, password : hashedPassword});

    try {
        //save new user to database 
        await newUser.save();
        //send success message to client if user is created successfully 
        res.status(201).json({ message : 'User created successfully'});
    } catch (error) {
        //send error message to client if user is not created successfully
        res.status(500).json(error.message)
    }
}