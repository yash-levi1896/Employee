const mongoose=require("mongoose");

const employeeschema=mongoose.Schema({
    FirstName:String,
    LastName:String,
    Email:String,
    Department:String,
    Salary:Number
});

const EmployeeModel=mongoose.model("employyee",employeeschema);


module.exports={EmployeeModel}