
const validator=require("validator")
 
   const Bcrypt =require("bcrypt")
const ValidateSignUpData=(req)=>{
    const {firstName,lastName,phone,email,Age,location,Gender,skills}=req.body;

    if((!firstName)|| (!lastName)){
        throw new Error("must be you fill Name")
    }
    else if( (firstName.length < 4 || firstName.length > 50) || (lastName.length < 4 || lastName.length > 50)){
        throw new Error(`{  firstName or LastName  ${firstName.length} ${lastName.length} must be min 5 letter && max 50 letter  }`)
    }
    else if(!validator.isEmail(email)){
       throw new Error("email is not valid email")
    }

}

const ValidatePatchUpdate=(req)=>{
    const {firstName,lastName,Age,phone,location,photoURL}=req.body

   if(firstName!==undefined){

    if((firstName.length < 5 ) || (firstName.length > 50)){
         throw new Error("firstName must be min 5 character or max 50 charatcter")
    }
   }

   if(lastName !==undefined){
    if( (lastName.length < 5)  || (lastName.length > 50 ) ){
        throw new Error("lastName must be min 5 character or max 50 character")
    }
   }
     
  
   if(Age !==undefined){
     if( (!Age) || (Age.length > 18)){
        throw new Error("fill Age, or must be Age older 18")
    }
   }

   if(photoURL !==undefined){
    if(!validator.isURL(photoURL)){
        throw new Error("this is not image url correct Inavlid photo extenation !")
    }
   }
    
}

const CheckValidateLogin=(req)=>{
    const {email,password}=req.body
    if(email !==undefined){
        if(!validator.isEmail(email)){
            throw new Error("fill email")
        }
    }
    if(password !==undefined){
        if(!password){
            throw new Error("fill password ")
        }
    }
}


  const ValidateDataProfileUpdate = (req)=>{

    

        const isAllowFields=[ 
            "firstName",
            "lastName",
            "DOB","Age",
            "location","password","Gender","phone","skills","photoURL"];

            const isUpdateFieldsAlloWed = Object.keys(req.body).every((fields)=>isAllowFields.includes(fields));


            return isUpdateFieldsAlloWed;
    
  }

  const ValidatePasswordUPdatProfile=(req)=>{

     //only update password
     // ask current password
     // if is correct current password
     // enter new password 
     //update password 
   
   

     const isAllowtoUpdate=["password","Newpassword"]

    
 


      const isUpdatePassword=Object.keys(req.body).every((feilds)=>isAllowtoUpdate.includes(feilds))
      if(!isUpdatePassword){
        throw new Error("you can not updated ")
      }

    
      
      return isUpdatePassword;

  }
   
module.exports={ValidateSignUpData,ValidatePatchUpdate,CheckValidateLogin,ValidateDataProfileUpdate,ValidatePasswordUPdatProfile}