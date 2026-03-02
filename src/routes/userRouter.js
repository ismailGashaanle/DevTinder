
const express = require("express");
const { UserAuth } = require("../middlewares/Auth");
const connectionRequest=require("../models/connectionRequest")

const UserRouter=express.Router();
const User=require("../models/user.js")
 
  const Save_DATA_PERSONAL=["firstName","lastName","Age","location","Gender","skills","photoURL"]

UserRouter.get("/user/requests/received",UserAuth,async(req,res)=>{

    try{
        const loggedUser=req.user;

        const ConnectionsRequests= await connectionRequest.find({
            toUserId:loggedUser._id,
            status:"interested"
        }).populate("fromUserId",Save_DATA_PERSONAL)

   res.json({
    message:"received requests",
    data:ConnectionsRequests
   } )

    }catch(err){
        res.send("ERROR : not recieved requests " +err.message)
    }

})


UserRouter.get("/user/connection",UserAuth, async(req,res)=>{

    try{
        const logginUser=req.user;

     const    connectionRequests=await connectionRequest.find({
        $or:[
            {toUserId:logginUser._id,status:"accepted"},
            {fromUserId:logginUser._id,status:"accepted"}
        ]
     }).populate("fromUserId",Save_DATA_PERSONAL).populate("toUserId",Save_DATA_PERSONAL)

       const data=connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString()===logginUser._id.toString()){
            return row.toUserId
        }
        return row.fromUserId
       })

       res.json({
        message:"connection is :",
        friends:data
       })

    }catch(err){
        res.send("ERROR : "+err.message)
    }
    
})

UserRouter.get("/feed",UserAuth,async(req,res)=>{
//get all users in database except loggeduser 
// and connectionUser 
// and request user

  
    try{
     
         const loggedUser=req.user
        const page=parseInt(req.query.page) || 1
        let limit=parseInt(req.query.limit) || 10
        limit= limit > 50 ? 50 :limit
    
        const skip=(page -1)*limit;
        const ConnectionRequests= await connectionRequest.find({
            $or:[
                {fromUserId:loggedUser._id},
                 {toUserId:loggedUser._id}
            ]
            
        }).select("fromUserId  toUserId")

        const HiddenUser= new Set();
        ConnectionRequests.forEach((req)=>{
        HiddenUser.add(req.fromUserId.toString())
        HiddenUser.add(req.toUserId.toString())
        })
 

        const Users=await User.find({
            $and:[
                {_id:{$nin:Array.from(HiddenUser)}}, // nin  means not inside this array
                {_id:{$ne:loggedUser._id}} //ne means not equal to
            ]
        }).select(Save_DATA_PERSONAL).skip(skip).limit(limit)
        res.send(Users)
            

    }catch(err){
        res.send("Error :" +err.message)
    }


})
  
module.exports=UserRouter