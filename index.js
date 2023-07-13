const express=require('express');
app=express();
const {connection}=require('./db');
const {UserRoute}=require("./Routes/user.route")
const {DashRoute}=require("./Routes/dash.route");
const { authentication } = require('./Middleware/authentication.middleware');
require('dotenv').config()

app.use(express.json());


app.get("/",async(req,res)=>{
    res.send("hi")
})

app.use("/",UserRoute)
app.use(authentication)
app.use("/dashboard",DashRoute)










app.listen(process.env.PORT,async ()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running");
})