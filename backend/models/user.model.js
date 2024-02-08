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
    },
    profilePicture: {
        type: String,
        default: 
            'https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o='
    },
}, {timestamps: true});


// Create a new model for the user schema and export it.
const User = mongoose.model('User', userSchema);

export default User;