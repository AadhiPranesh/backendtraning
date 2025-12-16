const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
router.use(express.json());


const StudentSchema = new mongoose.Schema({
    name: {

        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dept: {
        type: String,

    },
    age: {
        type: Number,
    },

})
const studentModel = mongoose.model("student", StudentSchema)

// post method
// middleware to parse json body   ( then able to read req.body  , without this it will be undefined .  normal format data kku express.urlencoded use pannanum)
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

router.delete('/delete/:id',async (req, res) => {
    try {
        console.log('delete method');
    const { id } = req.params;
    const deleted = await studentModel.findByIdAndDelete(id)  
    res.send(deleted)
    } catch (error) {
         
    }
})


//put method
router.put('/replace/:id', (req, res) => {
    console.log('replace method');
    const { id } = req.params;
    const { name } = req.body;
    const index = student.findIndex((items) => {
        return items.id == id
    })
    student[index] = { name }
    res.send(index)
})


// // get method
// app.get('/get',(req,res)=>{
//     console.log('get method');
//     res.send("get");
// })
// get student method

function checkname(req, res, next) {
    if (true) {
        next();
    }
    else {
        throw new Error("name not found")
    }
    next();
}
router.get('/student', (req, res) => {
    res.send(student);
})
module.exports = router;