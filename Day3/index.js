const express=require('express');
const connectDB=require('./Connection/Connect')
const mongoose=require("mongoose")
const app=express();

app.use(express.json())
const studentRoute= require('./Routes/StudentRoute')
const Course=require('./Routes/CourseRouter')

// mongoose.connect("mongodb://localhost:27017/BackendTech")
// .then(()=>{
// console.log("bakend  connected")
// }).catch((error)=>{
//     console.log(error)
// })
app.use('/course',Course)
app.use('/student',studentRoute)
// app.listen(3000,()=>{
//     console.log("port nmuber 3000 is connected")
// })
connectDB().then(()=>{
    app.listen(5555,()=>{
        console.log("server is running on port 5555");
    })
})