require('dotenv').config();
const mongoose=require("mongoose")
const express=require("express")
const connectToDB = require("./config/db");
const router = require('./routes/userRoutes');
const courseRouter = require('./routes/courseRoutes');

const app=express()
const port = process.env.PORT


app.use(express.json())

app.use("/user",router)
app.use("/course",courseRouter)

app.listen(port,async(req,res)=>{
    await connectToDB()
    console.log("server started and connect to db")
})