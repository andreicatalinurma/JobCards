import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';


export const test = (req, res) => {
    res.json({
        message: 'APi is working'
    })
}


//update user
export const updateUser = async (req, res, next) => {
    //check if the user is updating his own account
    if (req.user !== req.params.id) {
        return next(errorHandler(401, 'You can update only your account'));
    }
    try {
        if (req.body.password) {
            req.body.password = await bcryptjs.hashSynk(req.body.password, 12);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
        },
        {new: true}
        );
        //remove password from response
        const {password, ...rest} = updatedUser._doc;
        //send response back to client the updated user without password 
        res.status(200).json(rest);
    } catch (err) {
        next(err);
    }
}