

const express = require("express");

const Bcrypt=require("bcrypt")
const ProfileRouter=express.Router();
const {UserAuth} =require("../middlewares/Auth.js")
const validator=require("validator")
const {ValidateDataProfileUpdate,ValidatePatchUpdate,ValidatePasswordUPdatProfile} = require("../utils/Validate.js")


 ProfileRouter.get("/profile/view", UserAuth,async(req,res)=>{

    try{
        
      
        const user=req.user
            res.send(user)
    }catch(err){
        res.send("ERROR : " +err.message)
    }

         
     })



     ProfileRouter.patch("/profile/edit",UserAuth,async(req,res)=>{
       //validateDataProfileUpdate
       

       try{

        if(!ValidateDataProfileUpdate(req)){
            throw new Error ("invalid request edit ")
        }

        const logginUser=req.user;
        console.log(logginUser)
        Object.keys(req.body).forEach((key)=>logginUser[key]=req.body[key])
        res.json({
            message:`{${logginUser.firstName} your profile updated successfully 😍}`,
             data:logginUser
        })
       await  logginUser.save();
        console.log(logginUser)

       }
      catch(Err){
        res.send("ERROR :"+Err.message)
      }


     })


   ProfileRouter.patch("/profile/password/forget",UserAuth,async(req,res)=>{
     
      //validate
      //get current password 
      //updated current password to ======> new password
      // update success
      try{

         if(!ValidatePasswordUPdatProfile(req)){
          throw new Error("you can't chanage password")
            
         }
         const logginUserPassword=req.body.password;
       
         const checkIsMatchedPassword = await Bcrypt.compare(logginUserPassword,req.user.password);
         if(!checkIsMatchedPassword){
          throw new Error("password is not match !!! try again")
         }
         
           const  logginUser= req.user;
         let  Newpassword= req.body.Newpassword

         if(logginUserPassword===Newpassword){
            throw new Error("make new password")
         }
         
         if(!validator.isStrongPassword(Newpassword)){
          throw new Error("weak password , please try to make Strong password")

         }
          const Hashpasseord = await Bcrypt.hash(Newpassword,10)
            logginUser.password=Hashpasseord
           
  
       
         await logginUser.save();
        
          res.send(logginUser)
           
          
          

      }catch(Err){
        res.send("ERROR : "+Err.message)
        console.log(Err)
      }
   })
     

module.exports= ProfileRouter