const express=require("express");
const { EmployeeModel } = require("../Models/employee.modle");
const {authentication}=require("../Middleware/authentication.middleware")
const DashRoute=express.Router();



DashRoute.post("/employees",authentication,async(req,res)=>{
    const { FirstName,LastName,Email,Department,Salary}=req.body;
    try {
        let employee=await new EmployeeModel({FirstName,LastName,Email,Department,Salary});
        employee.save();
        res.status(201).send({msg:"employee data saved !"})
    } catch (error) {
        res.status(201).send({msg:"some error occured!"});
        console.log(error)
    }
})

DashRoute.delete("/delete/:id",async(req,res)=>{
      const {id}=req.params;
      try {
        await EmployeeModel.findByIdAndDelete({_id:id});
        res.status(201).send({msg:"employee deleted!"})
      } catch (error) {
        console.log(error.message)
        res.status(400).send({msg:"some error occured!"})
      }
});

DashRoute.get("/show",async(req,res)=>{
    const {page}=req.query;
    let pageNo=page||1;
    try {
        let data=await EmployeeModel.find().skip(5*(pageNo-1)).limit(5);
    res.status(201).send({msg:data})
    } catch (error) {
        res.status(400).send({msg:"some error occurred !"})
    }
    
})
DashRoute.get("/filter",async(req,res)=>{
    const {Department}=req.query;
    let pageNo=page||1;
    try {
        let data=await EmployeeModel.find({Department}).skip(5*(pageNo-1)).limit(5);
    res.status(201).send({msg:data})
    } catch (error) {
        res.status(400).send({msg:"some error occurred !"})
    }
    
})
DashRoute.get("/sort",async(req,res)=>{
   // const {salary}=req.query;
    let pageNo=page||1;
    try {
        let data=await EmployeeModel.find().sort({Salary:1}).skip(5*(pageNo-1)).limit(5);
    res.status(201).send({msg:data})
    } catch (error) {
        res.status(400).send({msg:"some error occurred !"})
    }
    
})














module.exports={DashRoute}