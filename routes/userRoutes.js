const express=require("express")
const {usermodel} = require("../modules/userModel.js")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Auth = require("../middleware/Auth.js");
require('dotenv').config();
const router=express.Router()

// router.post("/ragistration",async(req,res)=>{
//     console.log("getting")
//     const {username,password,enrolledCourses}=req.body
//     try {
        
//         bcrypt.hash(password, 8,async function(err, hash) {

//             const data=await usermodel.findOne({username})
//             if(data) return res.send("user already present")
            
//             if(!err){
//                 const user=new usermodel({username,password:hash,enrolledCourses})
//                 await user.save()
//                 console.log("user post ",user)
//                 res.json({message:"signup Successfull",user})
//             }
//             else{
//                 res.json({message:"error occured during hashing of password",err})
//             }
            
//         });
            
//     }catch (error) {
//             res.json({message:"error occured",error})
        
//     }
   
    
// })

router.post("/login",async(req,res)=>{
   const {username,password}=req.body
   try {
        const user=await usermodel.findOne({username})
        console.log("users of ",user._id) // it will give us undefined
        // console.log(password) 
        // console.log(user.password) 
        if(!user) return res.json({message:"user Not Found"})

        if(user){
            bcrypt.compare(password,user.password, function(err,result){
                // console.log(result)  // am getting false
                if (err) {
                    return res.status(500).json({ message: "Error comparing passwords", error: err });
                }
                if(result){
                    const token=jwt.sign({_id:user._id},process.env.Secret_key)
                    res.json({message:"user logged in sucessfull",token:token})
                } else{
                    return res.json({message:"invalid email/password"})
                }
                
            
            })
        }
       
    } catch (error) {
    res.json({message:"something went wrong ",error})
   }
})

router.get("/allroutes",Auth,(req,res)=>{  // isko axis krne ke liye mujhe Auth me se decode ke baad next() likhna pdega only bsss
    res.send("getting all users")
})
module.exports=router