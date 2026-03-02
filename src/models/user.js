 
const mongoose=require("mongoose");
const validator=require("validator")
const jwt =require("jsonwebtoken")
const Bcrypt = require("bcrypt")
const UserSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:[true,"fill firstname"],
        trim:true,
        lowercase:true,
       
    },
    lastName:{
        type:String,
        required:[true,"fill lastName"],
        trim:true,
        lowercase:true
    },
    phone:{
        type:String,
        required:[true,"must be fill phone"],
        min:7,
        max:11,
         trim:true,
        lowercase:true,
        unique:[true,"al ready phone exit "],
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error("mobile phone is not valid phone ,is invalid number ")
            }
        }
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
       unique:[true,"al ready user email exit"],
       required:[true,"must be fill email"],
       validate(value){
          if(!validator.isEmail(value)){
            throw new Error("inavlid email : " + value)
          }
       }
     
    },
  Gender:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        validate(value){
            if(!["male","female"].includes(value)){
            throw new Error("gender value is invalid must be ethier male or female, only ")

            }
        }
    },
    location:{
        type:String,
        default:"hargeisa",
        trim:true,
        lowercase:true,
    },
    DOB:{
        type:Date,
        required:[true,"fill Date Of Birth"]
    },
    password:{
        type:String,
        required:[true,"fill password"],
        // maxLength:16,
        minLength:8,trim:true,
       
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("weakness password so make strong password " + value)
            }
        }
    },

    photoURL:{
       type:String,
       default:"https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg",
       trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("photo is not image extentation :" +value)
            }
        }
    },
    Age:{
        type:Number,
        min:18,
        trim:true,
        lowercase:true,
    },
    skills:{
        type:[String],
        trim:true,
        lowercase:true,
        maxLength:20,
        minLength:1
    }


},{
    timestamps:true
})


//userSchema MEHODS

UserSchema.methods.getJWT = async function (){
    const user=this

//  const token = await jwt.sign({_id:user._id,},"Dev#@01710!`~",{expiresIn:"7d"})
const token=  await jwt.sign({_id:user._id},"Dev#@01710!`~",{expiresIn:"1d"})

  return token;

}

UserSchema.index({firstName:1,lastName:1})
UserSchema.methods.ValidatePassword= async function(passwordInputByUser){
    user=this;
    const Hash_Password=user.password

    const isValidPassword=await Bcrypt.compare(passwordInputByUser,Hash_Password)

    return isValidPassword;
   
}


module.exports=mongoose.model("User",UserSchema)