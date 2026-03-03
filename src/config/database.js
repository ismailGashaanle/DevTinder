
// const mongoose=require("mongoose");

// const ConnectDB=async()=>{
//     await mongoose.connect(process.env.MONGO_URI)
// }

// module.exports=ConnectDB



const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

module.exports = ConnectDB;