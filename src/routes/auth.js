
const express= require("express");
const {UserAuth} =require("../middlewares/Auth.js")
const AuthRouter=express.Router();
const User=require("../models/user.js")
const jwt = require("jsonwebtoken")

const Bcrypt= require("bcrypt")
const cookieParse=require("cookie-parser");
const {ValidateSignUpData,ValidatePatchUpdate,CheckValidateLogin}=require("../utils/Validate")

  AuthRouter.post("/signup",async(req,res)=>{
        
         
        

       
         const data=req.body
            try{
                
                ValidateSignUpData(req)
                const {firstName,
                    lastName,
                    DOB,
                    Age,
                    email,
                    location,
                    password,
                    Gender,
                    phone,
                    skills}=req.body

                const Password_Hash= await Bcrypt.hash(password,10);
                 

                const Allow_Post=["_id","skills","email","password","location","Age","phone",
                    "DOB","photoURL","Gender","lastName","firstName"
                ];

                const isPostAllow=Object.keys(data).every(k=>Allow_Post.includes(k));
                if(!isPostAllow){
                    return res.status(400).send("Not allowed to register this user");
                }


                  const user=new User({
                    firstName,
                    lastName,
                    DOB,
                    Age,
                    email,
                    location,
                    password:Password_Hash,
                    Gender,
                    phone,
                    skills
                  })
           const SavedUser =  await  user.save();
            const token =  await SavedUser.getJWT();
            //   console.log(token)
              res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000)})
                res.json({ message :"user added successfully ..." ,SavedUser})
            }
    catch (err) {
    console.error(err);
    return res.status(400).json({
        message: err.message || "Something went wrong"
    });
}
  
     })



       AuthRouter.post("/login",async(req,res)=>{

        try{
              const {email,password}=req.body
        
         CheckValidateLogin(req)

         // logic 

         const user=await User.findOne({email:email})
      
        
          if(!user){
            throw new Error("invalid Credenatials")
          }

        //    const isHashPassword=await Bcrypt.compare(password,user.password)
        const isHashPassword = await user.ValidatePassword(password);
             // const token= await jwt.sign({_id:user._id},"Dev#@01710!`~",{expiresIn:"1d"})
             const token =  await user.getJWT();
            //   console.log(token)
              res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000)})



               //"firstName","lastName","skills","DOB","Age","location"
                const person_Save_Data={
                    firstName:user.firstName,
                    lastName:user.lastName,
                    skills:user.skills,
                    Age:user.Age,
                    location:user.location,
                    photoURL:user.photoURL
                }
          if(isHashPassword){
            res.send(person_Save_Data)
            
          }
          
   

          else{
          res.status(400).send("invalid Credential")
          }

          


        }catch(err){
           res.status(400).send("ERROR : "+"invalid Credential")
        }


     })


     AuthRouter.post("/logout",async(req,res)=>{

         res.cookie("token",null,
          {expires:new Date(Date.now())

         }).send("logout successfully !!")
     })




module.exports=AuthRouter