const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    enrolledCourses:[{
        type : mongoose.Schema.Types.ObjectId ,
        ref: 'course'
    }]
})
const usermodel=mongoose.model("user",userSchema)

const courseSchema=new mongoose.Schema({
    title:String,
    category:String,
    difficulty:String,
    description:String
})
const courseModel=mongoose.model("course",courseSchema)

module.exports={usermodel,courseModel}