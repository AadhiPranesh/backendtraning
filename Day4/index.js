const express=require('express');
const connectDB=require('./Connection/Connect')
const mongoose=require("mongoose")
const app=express();
const cookieParser=require("cookie-parser");
app.use(express.json())
const studentRoute= require('./Routes/StudentRoute')
const Course=require('./Routes/CourseRouter')
const Admin=require('./Routes/AdminRouter')
// mongoose.connect("mongodb://localhost:27017/BackendTech")
// .then(()=>{
// console.log("bakend  connected")
// }).catch((error)=>{
//     console.log(error)
// })
app.use(cookieParser());
app.use('/course',Course);
app.use('/',studentRoute);
app.use('/',Admin);

// app.listen(3000,()=>{
//     console.log("port nmuber 3000 is connected")
// })
connectDB().then(()=>{
    app.listen(5555,()=>{
        console.log("server is running on port 5555");
    })
})