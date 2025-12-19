const express = require('express');
const router = express.Router();
const courseModel=require('../models/Coursemodel')
router.use(express.json());
const bcrypt = require('bcrypt')
const validator = require('validator')
const stdmodel = require("../models/studentmodel")
const auth=require("../Middleware/auth")
const jwt=require("jsonwebtoken")


router.post('/admin/signup',async(req,res)=>{
    try{
        const {name,email,password,dept,age,role}=req.body;
        if(!validator.isEmail(email)){
            return res.json({message:"invalid email format"});
        }
        if(!validator.isStrongPassword(password)){
            return res.json("password is not strong enough");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent=new stdmodel({
            name,
            email,
            password: hashedPassword,
            dept,
            age,
            role
        });
        await newStudent.save();
        res.json({message:"admin registered successfully",data:newStudent});
    }catch(err){
        res.status(500).send(err.message);
    }
})

router.post('/admin/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const student =await stdmodel.findOne({email:email});
        if(student.role!='Admin'){
            return res.json({message:"accessss denied"});
        }
        const verifypassword=await bcrypt.compare(password, student.password);
        console.log(verifypassword);
        if(verifypassword==false){
           return res.json({message:"invalid credentials"});
        }
        const token= await jwt.sign({id:student._id},"secret");
        res.cookie('token',token);
        res.json(student);
    }catch(err)
    {
        res.status(500).send(err.message);
    }
})

router.get('/admin',auth,async(req, res) => {
try{
    
    const std=await stdmodel.find({});
    if(!std){
        return res.json({message:"no admins found"});
    }
    res.json(std);
}catch(err){
    res.status(500).send(err.message);
}
});

router.get('/admin/:id',auth,async(req,res)=>{
   try{
    const {id}=req.params;
    const student=await stdmodel.findById(id);
    res.json({message:"admin found",student});
   }catch(err){
    res.status(500).send(err.message);
   }    
});

router.post('/addadmin',auth,async(req, res) => {
 try{
 const {name, email,dept,age} = req.body; //object destructuring
    const newStudent = new stdmodel({
        name,
        email,
        dept,
        age
    });
    await newStudent.save();
    res.send(newStudent);
 } catch(err){
    res.status(500).send(err.message);
 }
});

router.put('/replaceadmin/:id',auth,async(req,res)=>{
    
    try{
    const {id}=req.params;
    const {name,email,dept,age}=req.body;
    const update= await stdmodel.findByIdAndUpdate(id,{name,email,dept,age});
     if(!update){
        return res.json({message:"no admins found"});
    }
    res.json({message:"admin updated",update});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/deleteadmin/:id',async(req,res)=>{
   
   try{
     const {id}=req.params;
    const deleted=await stdmodel.findByIdAndDelete(id); 
     if(!deleted){
        return res.json({message:"no admins found"});
    }
    res.send(deleted);
   }
   catch(err){
    res.status(500).send(err.message);
   }
});

router.patch('/assigncourse/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(req.body)
        const {courseId}=req.body;
        const Student=await stdmodel.findById(id);  
        console.log(Student)
        if(!Student){
            return res.json({message:"no student found"});
        }
        // Fetch the complete course details
        const course=await courseModel.findById(courseId);
        console.log(course)
        if(!course){
            return res.json({message:"course not found"});
        }
        
        // Store complete course details in assignedCourses
        const courseDetails={
            id:course.id,
            title:course.title,
            description:course.description
        };
        
        const student=await stdmodel.findByIdAndUpdate(id,{$push:{assignedCourses:courseDetails}},{new:true});
        if(!student){
            return res.json({message:"no admins found"});
        }   
        
        res.json({message:"admin updated",data:student});
    }catch(err){
        res.status(500).send(err.message);
    }
});

module.exports=router;



