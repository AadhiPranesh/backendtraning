const express=require('express')
const connectDB=require('./Connection/connect')
const app=express();
const mongoose=require('mongoose')
app.use(express.json())

const user=require('./Routes/UserRouter');
const bookRouter = require('./Routes/BooksRouter');
app.use('/book',bookRouter)
app.use('/user',user)
connectDB().then(()=>{
    app.listen(5000,()=>{
        console.log("server is running on port 5000");
    })
})
