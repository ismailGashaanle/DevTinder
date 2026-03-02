

const mongoose=require("mongoose");


const connectionRequestSchema= new mongoose.Schema({

    fromUserId:{
        type:mongoose.SchemaTypes.ObjectId,
         required:true,
          ref:"User"
    },
    toUserId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"User"
    },

    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected" ],
       
            message:`{value} invalid status `
        }
    }
},{timestamps:true})

//  connectionRequestSchema.pre("save",function(next){
  
//      const connectionRequest=this;

//      if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
//         throw new Error("you can not request your self !!")
//      }

// next();


// })

connectionRequestSchema.index({fromUserId:1,toUserId:1}, { unique: true })

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports=ConnectionRequestModel