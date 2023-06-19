import express from "express";
import dotenv from 'dotenv';
import cors from "cors"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from './routes/auth.js';
import contactRoute from './routes/contact.js';

//import {authMiddleware} from './middlewares/auth.js';



const app=express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

//routes
// app.get('/protected', auth, (req,res) =>{
//     return res.status(200).json({...req.user._doc})
// })
app.use('/api/auth', authRoute);
app.use('/api', contactRoute);

//server
const PORT= process.env.PORT || 5000;
app.listen(PORT, async() =>{
    try{
    await connectDB();
    console.log(`server is running on port: ${PORT}`)
    } 
    catch(err){
        console.log(err);
    } 
});
