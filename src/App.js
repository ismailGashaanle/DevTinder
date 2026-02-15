
const express=require("express");


   //intilaise app

   const app=express();

   const port=3000

   app.get("/user/:Userid",(req,res)=>{
    const id=req.params
    res.send("user ismail")
    console.log(id)
   })

   app.post("/user",(req,res)=>{
    res.send("created successfully register !")
   })


   app.listen(port,(req,res)=>{
    console.log("server running",port)
   })