import dotenv from 'dotenv';
dotenv.config()

import express from "express";
import mongoose  from 'mongoose';
import cors from "cors";
import connectDb from './config/mongodb.js';
import authRouter from './routes/auth.routes.js';
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(
    cors(
    {
        origin: 'http://localhost:5173'
    }
),);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
connectDb();

//routes
app.get("/", (req,res) =>{
    res.send("API Working fine");
});

app.use('/api/auth', authRouter);

if(process.env.NODE_ENV === 'development'){
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    });
}

export default app;

