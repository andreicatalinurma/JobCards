import mongoose from 'mongoose';

// Create a new schema for the user model with three fields: username, email, and password. The username and email fields are required and unique, and the password field is required. The timestamps option will automatically add createdAt and updatedAt fields to the schema.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});


// Create a new model for the user schema and export it.
const User = mongoose.model('User', userSchema);

export default User;