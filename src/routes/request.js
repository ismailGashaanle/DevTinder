
  const express = require("express");

  const requestRouter=express.Router();
const {UserAuth} =require("../middlewares/Auth.js")
 const connectionRequest=require("../models/connectionRequest.js")
 const User=require("../models/user.js")


  
       //connectionRequest API
  
       requestRouter.post("/request/send/:status/:touUerId",UserAuth,async(req,res)=>{
  
          try{
  
              const fromUserId=req.user._id;
              const toUserId=req.params.touUerId
              const status=req.params.status;
              
              
             const FindToUserId= await User.findById(toUserId);
             if(!FindToUserId){
              throw new Error("user does not exit")
             }

             const logginUser=req.user;
             if(fromUserId.toString()===toUserId){
              throw new Error("you can not request your self")
             }
            
              
          const  allowStatus=["ignored","interested"];

               if(!allowStatus.includes(status)){
                throw new Error("inavlid status Type")

               }


               const existingConnectionUser= await connectionRequest.findOne({
              $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
              ]
             })
             if(existingConnectionUser){
              throw new Error ("al ready connection request")
             }
               

             const newRequest= connectionRequest({
                fromUserId,
                toUserId,
                status
               })
  

               

             const ConnectionRequestData =  await newRequest.save();
             

             res.send(ConnectionRequestData)
  
          }catch(err){
              res.send("ERROR : " +err.message)
          }
  
       })



       // connectionReview API

        requestRouter.post("/request/review/:status/:requestId",UserAuth, async(req,res)=>{

          try{
           
            const {status,requestId}=req.params;
               const LoggedUserId =req.user._id;
            const IssallowStatus=["accepted","rejected"];
            const AllowStatusRequest=IssallowStatus.includes(status)
           
            if(!AllowStatusRequest){
              return res.status(400).json({
                message:"not allow this status => " + status,
              })
            }
            

            const ConnectionRequest= await connectionRequest.findOne({
              _id:requestId,
              toUserId:LoggedUserId,
              status:"interested"
            
            })
            
            //  if(!requestId){
            //   throw new Error("not found this user")
            // }
             
            if(!ConnectionRequest){
              return res.status(400).json({
                message: "Request is invalid or already processed",
              });
            }

                


            ConnectionRequest.status=status
           
            await ConnectionRequest.save();

         
            res.json({
            message: "Your request reviewed successfully",
              data:ConnectionRequest
            })
             

          }catch(err){
            res.send("ERROR :" + err.message)
          }

        })

      


  module.exports=requestRouter