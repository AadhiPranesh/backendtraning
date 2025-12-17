const express = require('express');

const router = express.Router();
const mongoose = require("mongoose");
router.use(express.json());
const bcrypt= require('bcrypt')
const validator=require('validator')
const studentModel=require("../models/studentmodel")
// signup

router.post("/signup",async(req,res)=>{
    try {
        const {name,email,password,dept,age}=req.body;
        if(!validator.isEmail(email)){
            return res.json("invalid email")
        }
        if(!validator.isStrongPassword(password))
        {
            return res.json("give strong password")
        }
        const hashedpassword= await bcrypt.hash(password,10)
        const  signupStudent= new studentModel({
            name,
            email,
          password: hashedpassword,
            dept,
            age
        })
        await  signupStudent.save();
        res.json({message:"Student registerd successfully",data:signupStudent})
    } catch (error) {
        
    }
})

// login 
router.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await studentModel.findOne({email:email})
        const verifypassword =await bcrypt.compare(password,user.password)
        // const ispasswordcorrect =user.password==password
        console.log(verifypassword)
        if(verifypassword === false)
        {
            return res.json("invalid credreatails")
        }
        res.json(`message:${user.name} login successfully`)
        res.json(user)
    } catch (error) {
        res.json({message:error.massage})
        
    }
})

router.post('/add', async (req, res) => {
    console.log('post method');
    try {
        const { name, email, dept, age } = req.body; //  body destructuring
        //    const newStudent= {id,name,email}
        //    student.push(newStudent) 
        const newStudent = new studentModel({
            name,
            email,
            dept,
            age
        })
        await newStudent.save()
        res.send(newStudent)
    }
    catch (error) {
        res.send(error);
    }
})

router.get("/student/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const student= await studentModel.findById(id);
        if(!student){
            return res.json({message:"no student found"})
        }
        res.json({massage:"student found",data:student});
    } catch (error) {
        res.json({message:error.message})
    }
})


//delete
router.delete('/delete/:id', async (req, res) => {
    try {
        console.log('delete method');
        const { id } = req.params;
        const deleted = await studentModel.findByIdAndDelete(id)
         if(!deleted){
            return res.json({message:"no student found"})
        }
        res.json({ message: "student delete", data: deleted.name });
    } catch (error) {
        res.json({ message: error.message });
    }
})


//put method
router.put('/replace/:id', async(req, res) => {
    try {
        console.log('replace method');
        const {id}=req.params
        const {name,email,dept,age}=req.body;
    const updated= await studentModel.findByIdAndUpdate(id,{name,email,dept,age})
     if(!updated){
            return res.json({message:"no student found"})
        }
    } catch (error) {
        console.log(error)
    }
})

// function checkname(req, res, next) {
//     if (true) {
//         next();
//     }
//     else {
//         throw new Error("name not found")
//     }
//     next();
// }
router.get('/student', async(req, res) => {
   try {
    const student = await studentModel.find()
     if(!student){
            return res.json({message:"no student found"})
        }
     res.send(student);

   } catch (error) {
    console.log(error)
   }
})
module.exports = router;