const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require("../Middleware/auth")
router.use(express.json())
const CourseModel = require("../models/Coursemodel")
// const Course = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true

// //     }
// // })
// co
// nst CourseModel=mongoose.model("course",Course)

router.get("/course", auth, async (req, res) => {
    try {
        console.log("get method in course");
        res.send(await CourseModel.find());
    } catch (error) {
        console.log(error)
    }
});
//post
router.post('/course/add', auth, async (req, res) => {
    const loggedUserRole = req.role;
    const { id, title, description } = req.body;
    if (loggedUserRole != "admin") {
        return res.json({ message: "access denied" });
    }
    console.log('post method');
    try {
        //  body destructuring
        //    const newStudent= {id,name,email}
        //    student.push(newStudent) 
        const newCourse = new CourseModel({
            id,
            title,
            description
        })
        await newCourse.save()
        res.send(newCourse)
    }
    catch (error) {
        res.send(error);
    }
})


router.get('/course/:id',auth,async(req,res)=>{
   try{
    const {id}=req.params;
    const course=await CourseModel.findById(id);
    res.json({message:"course found",course});
   }catch(err){
    res.status(500).send(err.message);
   }    
});

router.put('/replacecourse/:id',auth,async(req,res)=>{
    
    try{
      const loggedUserRole = req.role;
          const {id}=req.params;
    const {title, description}=req.body;
    if(loggedUserRole!="admin"){
        return res.json({message:"access denied"});
    }

    const update= await CourseModel.findByIdAndUpdate(id,{title, description});
     if(!update){
        return res.json({message:"no courses found"});
    }
    res.json({message:"course updated",update});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});


router.delete('/deletecourse/:id',auth,async(req,res)=>{
   
   try{
      
      const loggedUserRole = req.role;
        const {id}=req.params;
    if(loggedUserRole!="admin"){
        return res.json({message:"access denied"});
    }
   
    const deleted=await CourseModel.findByIdAndDelete(id); 
     if(!deleted){
        return res.json({message:"no courses found"});
    }
    res.send(deleted);
   }
   catch(err){
    res.status(500).send(err.message);
   }
});
module.exports = router;