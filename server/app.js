import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from './routes/auth.js';


const app=express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(morgan("tiny"));

//routes
app.use('/api/auth', authRoute);

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
