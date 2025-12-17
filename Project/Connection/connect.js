const mongoose=require("mongoose");
const express=require("express");
const app=express();

async function connectDB(){


await mongoose.connect("mongodb://localhost:27017/BackendTech")
.then(()=>{
    console.log("bakend  connected")
})
.catch((error)=>{
    console.log(error)
})
}
module.exports=connectDB;
