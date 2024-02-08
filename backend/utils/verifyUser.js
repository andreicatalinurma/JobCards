import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    //get token from cookies
    const token = req.cookies.access_token;

    //if there is no token stored in cookies, the request is unauthorized
    if(!token) {
        return next(errorHandler(401, 'You are not authenticated'));
    }
    //if there is token, we verify it
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(401, 'Token is not valid'));
        }
        //if token is valid, we set req.user and pass to next middleware
        req.user = user.id;

        //pass the request to the next middleware 
        next();
    })
}