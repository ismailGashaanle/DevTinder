 
 
const express=require("express");
// const {AdminAuth} =require("./middlewares/Auth")
 const cookieParse=require("cookie-parser")
require("dotenv").config();
const ConnectDB=require("./config/database.js")
const cors=require("cors")



   //intilaise app

   const app=express(); //intialize app



// app.use(
//   cors({
// //   origin:[ "http://localhost:5173],
//  origin: [
//     "http://localhost:5173", // local dev frontend
//     "https://dev-tinder-web-rho-five.vercel.app" // deployed frontend
//   ],
//   credentials:true,
// })

// )
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dev-tinder-web-rho-five.vercel.app"
    ],
    credentials: true,
  })
);
   app.use(express.json()) // this is middleware 
 app.use(cookieParse())
 
   const port=process.env.PORT //port connection server  


   const ProfileRouter = require("./routes/profile.js");
const AuthRouter = require("./routes/auth.js");
const requestRouter = require("./routes/request.js");
const UserRouter = require("./routes/userRouter.js");


     app.use("/",ProfileRouter)
     app.use("/",AuthRouter)
     app.use("/",requestRouter)
     app.use("/",UserRouter)



    ConnectDB().then(()=>{
        console.log("database conenction established")

           app.listen(port,(req,res)=>{
            console.log("server running")
            })

        
    }).catch((err)=>{
        console.log("not connected Database")
    })

