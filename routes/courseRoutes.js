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

// courseRouter.get("/course",async(req,res)=>{
//     const {page=1,limit=5,category,difficulty}=req.query

//    try {
//     let filter={}
//     if(category){
//         filter.category=category
//     }

//     if(difficulty){
//        filter.difficulty=difficulty
//     }
    

//     const data=await courseModel.find(filter).skip((page-1)*limit).limit(limit)
//     res.json({message:"filter by category and difficulty",data})
//    } catch (error) {
//     res.json(error)
//    }
// })

// courseRouter.post("/enroll",Auth,async(req,res)=>{
//     console.log("gettingenroll")
//     const {courseId}=req.body
//     try {
//         console.log("inside try block",req.user)
//         const data=await courseModel.findById(courseId)
//         // console.log(data)

//         if(!data) return res.json({message:"id not found"})
        
//         const user=await usermodel.findById(req.user._id) 
//         console.log("user data",user)

//         if(user.enrolledCourses.includes(courseId)){
//            return res.json({message:"user alredy inrolled"})
//         }
//        user.enrolledCourses.push(data)
//        await user.save()
//        console.log(user)
//        res.json({message:"succsessfully enrolled in the course",data:user})
//     } catch (error) {
//         res.json({message:"error in getting id",error})
//     }
// })

courseRouter.get("/all_courses",Auth,async(req,res)=>{
    const courseId=req.user._id
    try {
       
       console.log("course id",courseId)
        console.log("hey buddy")
        // console.log("users id ",req.user)
        const user=await usermodel.findById(courseId).populate('enrolledCourses'); 
        console.log("user enrolled course",user)
        res.json({message:"getting course data",user:user.enrolledCourses})
    } catch (error) {
        console.log("error",error)
        res.json({message:"getting error in all_courses data",error})
    }
})

module.exports=courseRouter