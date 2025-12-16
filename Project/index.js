const express=require('express')
const app=express();
app.use(express.json())

const user=require('./Routes/UserRouter');
const bookRouter = require('./Routes/BooksRouter');
app.use('/',bookRouter)
app.use('/',user)

app.listen(3000,()=>{
    console.log("port nmuber 3000 is connected")
})