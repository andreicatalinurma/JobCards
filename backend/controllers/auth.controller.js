import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

//create signup function to create new user 
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

//create signin function to sign in user
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

    //create google function to sign in user using google account
    export const google = async (req, res, next) => {
        try {
            //check if the user exist in the database using the email
            const user = await User.findOne({email: req.body.email});
            if (user) {
                //create token for the user to login using the id from db and a secret 
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
                //destructure the users data and send data without password to client
                const { password: hashedPassword, ...rest } = user._doc;
                //create expire date for the cookie 
                const expiryDate = new Date(Date.now() + 3600000);//1 hour
                res.cookie('access_token', token, { httpOnly: true, expires: expiryDate}).status(200).json(rest);
            } else {
                //create new user if user does not exist in the database 
                const generatedPassword = Math.random().toString(36).slice(-8);
                //create hashed password with 10 rounds of salt
                const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
                //create new user with username, email and hashed password 
                const newUser = new User({
                    username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8),
                    email: req.body.email,
                    password: hashedPassword,
                    profilePicture: req.body.photo,
                })
                //save new user to db
                await newUser.save();
                const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
                const { password : hashedPassword2, ...rest } = newUser._doc;
                const expiryDate = new Date(Date.now() + 3600000);//1 hour
                //send token as cookie to client 
                res.cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                }).status(200).json(rest);
            }
        } catch (error) {
            //send error message to client if user is not signed in successfully
            next(error)
        }
    }

