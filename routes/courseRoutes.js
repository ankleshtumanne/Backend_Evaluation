const express=require("express")
require('dotenv').config();
const { courseModel,usermodel } = require("../modules/userModel")
const Auth = require("../middleware/Auth.js")
const courseRouter=express.Router()
// const router=require("../routes/userRoutes.js")

courseRouter.post("/post_courseData",async(req,res)=>{
    const {title,category,difficulty,description}=req.body
    try {
        const user=new courseModel({title,category,difficulty,description})
        await user.save()
        res.json({message:"post course data successful"})
    } catch (error) {
        res.json({message:"error occured",error})
    }
})

courseRouter.get("/course",async(req,res)=>{
    const {page=1,limit=5,category,difficulty}=req.query

   try {
    let filter={}
    if(category){
        filter.category=category
    }

    if(difficulty){
       filter.difficulty=difficulty
    }
    

    const data=await courseModel.find(filter).skip((page-1)*limit).limit(limit)
    res.json({message:"filter by category and difficulty",data})
   } catch (error) {
    res.json(error)
   }
})

courseRouter.post("/enroll",Auth,async(req,res)=>{
    console.log("gettingenroll")
    const {courseId}=req.body
    try {
        console.log("inside try block",req.user)
        const data=await courseModel.findById(courseId)
        // console.log(data)

        if(!data) return res.json({message:"id not found"})
        
        const user=await usermodel.findById(req.user.id) // here _id not working 
        console.log("user data",user)

        if(user.enrolledCourses.includes(courseId)){
           return res.json({message:"user alredy inrolled"})
        }
       user.enrolledCourses.push(courseId)
       await user.save()
       res.json({message:"succsessfully enrolled in the course",data:user})
    } catch (error) {
        res.json({message:"error in getting id",error})
    }
})

courseRouter.get("/all",Auth,(req,res)=>{
    res.send("getting all products")
})
module.exports=courseRouter