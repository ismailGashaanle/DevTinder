

// const express = require("express");

// const TestRouterApi=express.Router();

// const Bcrypt= require("bcrypt")
// const cookieParse=require("cookie-parser");

// const {ValidateSignUpData,ValidatePatchUpdate,CheckValidateLogin}=require("./utils/Validate")
// const User=require("./models/user.js")
// const {UserAuth} =require("./middlewares/Auth.js")



//      userRouter.get("/feed",async(req,res)=>{

//     try{
        
//         const Users= await User.find({});
//         res.send(Users)
//     }catch(err){
//         res.status(400).send("something wrong !!!")
//     }

//      })

//      userRouter.get("/user",async(req,res)=>{
//         const userEmail=req.body.email;
//         if(!userEmail && !req.body.email){
//             res.send("fill feild")
//         }
//       try{
//           const user =  await User.findOne({email:userEmail})
//           if(user.length===0){
//             res.status(401).send("user not found")
//           }
//           res.send(user)
//       }catch(Err){
//         res.status(401).send("user not found  !")
//       }
//      })

//      userRouter.get("/userbyId",async(req,res)=>{

//         const userId=req.body._id;
//         try{
//             const userbyId = await User.findOne({_id:userId})
//             res.send(userbyId)
//         }catch(err){
//             res.status(401).send("userID not found",err.message)
//         }


//      })
 

//      //delete userbyId
//      userRouter.delete("/user",async(req,res)=>{
//         const UserId=req.body._id;

       

//         try{
           

//             const userDeleted = await User.findByIdAndDelete({_id:UserId})
//               if(!userDeleted){
//             res.status(401).send("user not found")
//         }
             
//             res.send("successfully deleted user"+UserId)


//         }catch(err){
//             res.status(401).send("userId not found to deleted !")
//         }


//      })


//      //update user

//      userRouter.patch("/user/:userId",async(req,res)=>{
//         const userId=req.params.userId
//         // if(userId !==undefined){
//         //     throw new Error("this user ID is not found ")
//         // }
//         const data=req.body

//         try{
//              ValidatePatchUpdate(req)
//              const {  firstName,
//                     lastName,
//                     DOB,
//                     Age,
//                     email,
//                     location,
//                     password,
//                     Gender,
//                     phone,
//                     skills}=req.body
//                     const Password_Hash= await Bcrypt.hash(password,10)

//             const Allow_Update=["skills","Age","firstName","lastName","phone","photoURL","location","password"];

//             const isUpdateAllow=Object.keys(data).every(k=>Allow_Update.includes(k))
//             if(!isUpdateAllow){
//                 throw new Error("not updated allow ,email,and etc")
//             }
//             if(data?.skills.length>10){
//                   throw new Error("skills must be maximum 10 skills only")
//             }
//             const user = await User.findByIdAndUpdate(userId,{
//                   firstName,
//                     lastName,
//                     DOB,
//                     Age,
//                     location,
//                     password:Password_Hash,
//                     Gender,
//                     phone,
//                     skills
                
//             },{returnDocument:"after",runValidators:true})
//             res.send(user)

//         }
//         catch(err){
//             res.status(401).send("ERROR :" + err.message)
//             // console.log(err.message)
//         }
        
//      })


     

// module.exports=TestRouterApi;