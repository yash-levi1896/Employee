const mongoose=require("mongoose");

const userschema=mongoose.Schema({
    email:String,
    password:String
});

const UserModel=mongoose.model("user",userschema);


module.exports={UserModel}