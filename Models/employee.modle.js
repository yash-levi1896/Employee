const mongoose=require("mongoose");

const employeeschema=mongoose.Schema({
    Name:String,
    Email:String,
    Department:String,
    Salary:Number
});

const EmployeeModel=mongoose.model("employyee",employeeschema);


module.exports={EmployeeModel}