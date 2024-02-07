import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
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
        next(error)
    }
}

export const signin = async (req, res, next) => {
    //get email and password from request body
    const {email, password} = req.body;
    try {
        //check if the user exist
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(404, 'User not found'));
        //check if the password is correct
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
        //create token for the user to login using the id from db and a secret
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        //destructure the users data and send data without password to client
        const { password : hashedPassword, ...rest} = validUser._doc;
        //create expire date for the cookie
        const expireDate = new Date(Date.now() + 3600000);
        //send token as cookie to client
        res.cookie('access_token', token, { httpOnly : true, expires : expireDate  }).status(200).json(rest);
    } catch (error) {
        //send error message to client if user is not signed in successfully
        next(error)
    }
}