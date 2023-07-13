const express=require("express");
const bcrypt=require("bcrypt");
const { UserModel } = require("../Models/user.model");
const jwt=require("jsonwebtoken")
const UserRoute=express.Router();


UserRoute.post("/signup",async(req,res)=>{
    const {email,password,confirmpass}=req.body;
    let user=await UserModel.find({email});
    try {
        if(user.length===0){
            if(password==confirmpass){
                bcrypt.hash(password,10,async(err,hash)=>{
                    if(err){
                        throw err;
                    }
                    
                    else{
                        let userp= await new UserModel({email,password:hash});
                        userp.save();
                        res.status(201).send({msg:"user registered!"})
                    }
                })
               
            }else{
                res.status(400).send({msg:"confirm password should match password!"})

            }
        }else{
            res.status(400).send({msg:"Already registered please login !"})
        }
    } catch (error) {
        res.status(400).send({msg:error.message})

    }
})

UserRoute.post('/login',async(req,res)=>{
    const {email,password}= req.body;
    let user=await UserModel.find({email});
    try {
        if(user.length>0){
            bcrypt.compare(password,user[0].password,async(err,result)=>{
                if(err)
                throw err;
                if(result){
                    let token=jwt.sign({"UserID":user[0]._id},"masai");
                    res.status(200).send({msg:"login successfull !",token})
                }else{
                    res.status(200).send({msg:"Wrong Credentials!"})
                }
            })
        }
        else if(user.length===0){
            res.status(201).send({msg:"Please registered first !"});
        }
    } catch (error) {
        res.send({msg:error.message})
        console.log(error)
    }
})













module.exports={UserRoute}