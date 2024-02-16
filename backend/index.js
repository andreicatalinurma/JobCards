import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import jobRoutes from './routes/job.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();


//connect to MongoDB database 
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err)
})

//set the __dirname to the current working directory
const __dirname = path.resolve();

const app = express();

//middleware to serve static files
app.use(express.static(path.join(__dirname, '/client/dist')));

//serve the index.html file if the user hits the root url 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

//middleware to parse the request body
app.use(express.json());
app.use(cookieParser());

//middleware to serve static files
app.use("/backend/user", userRoutes);
app.use("/backend/auth", authRoutes);
app.use("/backend/job", jobRoutes);

//middleware to handle the errors 
app.use((err, req, res, next) => { 
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode
    })
})



//listen to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });