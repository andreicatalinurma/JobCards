import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
dotenv.config();


//connect to MongoDB database 
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err)
})
const app = express();

//allow express to parse incoming json data 
app.use(express.json());

app.use("/backend/user", userRoutes);
app.use("/backend/auth", authRoutes);





//listen to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });