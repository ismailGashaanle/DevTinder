const jwt=require("jsonwebtoken")
const User=require("../models/user")
const AdminAuth= (req,res,next)=>{
     const token="n01";
        const isAdminAuthorized="n01"
        if(isAdminAuthorized===token){
        res.send("get allData by admin")
        
       
        }else{
            res.status(401).send("unAuthorized")
        }
        
}

// const UserAuth= async(req,res,next)=>{
 
//     //get cookies
//     //validate token
//     //decoded token
//     //find user 
//     //verify user
//     //send user
//     //
//     try{
//          const cookies=req.cookies;
//      const {token}=cookies

//      if(!token){
//         throw new Error("invalid Token !!!!!!")
//      }
      
//       const decodedData= await jwt.verify(token,"Dev#@01710!`~");
//         const {_id}=decodedData;
//       const user= await User.findById(_id);
      
//       if(!user){
//         throw new Error("user not loggin or not found")
//       }
//       res.send(user)

//        next();

//     }catch(Err){
//         res.send("ERROR :" +Err.message)
//     }

// }


const UserAuth = async (req,res,next)=>{
   try{
      const cookies = req.cookies;
      const { token } = cookies;

      if(!token){
       //  throw new Error("Invalid Token");
         res.status(401).send("please login ")
      }

      const decodedData = jwt.verify(token,"Dev#@01710!`~");
      const {_id} = decodedData;

      const user = await User.findById(_id);

      if(!user){
         throw new Error("User not found");
      }

      req.user = user;   // ✅ attach user to request
      next();            // ✅ go to next middleware / route

   }catch(err){
      res.status(401).send("ERROR: " + err.message);
   }
}
 



module.exports={
    AdminAuth,
    UserAuth
    
}