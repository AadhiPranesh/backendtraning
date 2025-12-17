const mongoose=require("mongoose");
const express=require("express");
const app=express();

async function connectDB(){


await mongoose.connect("mongodb+srv://Backend:aadhi1234567890@cluster0.rzbfpqp.mongodb.net/BackendTech")
.then(()=>{
    console.log("bakend  connected")
})
.catch((error)=>{
    console.log(error)
})
}
module.exports=connectDB;
