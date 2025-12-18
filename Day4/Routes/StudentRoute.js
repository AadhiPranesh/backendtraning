const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
router.use(express.json());
const bcrypt = require('bcrypt')
const validator = require('validator')
const studentModel = require("../models/studentmodel")

const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json("no token found");
        }
        const decoded = await jwt.verify(token, "BACKEND1812")
        if (!decoded) {
            return res.json("no student find")
        }
        const { userId } = decoded
        const userdata = await studentModel.findById(userId)
        console.log(userdata)
        if (!userdata) {
            return res.json("no user found ")
        }
        next();
    } catch (error) {
        return  res.json("no user foun")
    }
}



// signup
router.post("/signup",async (req, res) => {
    try {
        const { name, email, password, dept, age, role } = req.body;
        if (!validator.isEmail(email)) {
            return res.json("invalid email")
        }
        if (!validator.isStrongPassword(password)) {
            return res.json("give strong password")
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const signupStudent = new studentModel({
            name,
            email,
            password: hashedpassword,
            dept,
            age,
            role
        })
        await signupStudent.save();
        res.json({ message: "Student registerd successfully", data: signupStudent })
    } catch (error) {

    }
})
// login 
router.post("/student/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await studentModel.findOne({ email: email })
        const verifypassword = await bcrypt.compare(password, user.password)
        console.log(user.role);
        if (user.role !== 'Student') {
            return res.json("Access Denied !")
        }
        // const ispasswordcorrect =user.password==password
        console.log(verifypassword)
        if (verifypassword === false) {
            return res.
                json("invalid credreatails")
        }
        const token = await jwt.sign({ userId: user._id }, "BACKEND1812") // create one token for me
        // console.log(token) 
        res.cookie("token", token)
        res.json({ message: "Student login successfully" })
        // res.json(user)
    } catch (error) {
        res.json({ message: error.massage })

    }
})
router.get("/student/:id",auth, async (req, res) => {
    try {
        const { id } = req.params;
        const student = await studentModel.findById(id);
        if (!student) {
            return res.json({ message: "no student found" })
        }
        res.json({ massage: "student found", data: student });
    } catch (error) {
        res.json({ message: error.message })
    }
})


//delete
router.delete('/delete/:id',auth, async (req, res) => {
    try {
        console.log('delete method');
        const { id } = req.params;
        const deleted = await studentModel.findByIdAndDelete(id)
        if (!deleted) {
            return res.json({ message: "no student found" })
        }
        res.json({ message: "student delete", data: deleted.name });
    } catch (error) {
        res.json({ message: error.message });
    }
})


//put method
router.put('/replace/:id',auth, async (req, res) => {
    try {
        console.log('replace method');
        const { id } = req.params
        const { name, email, dept, age } = req.body;
        const updated = await studentModel.findByIdAndUpdate(id, { name, email, dept, age })
        if (!updated) {
            return res.json({ message: "no student found" })
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
router.get('/student', auth, async (req, res) => {
    try {
        // const {token}=req.cookies;

        // if(!token)
        // {
        //     return res.json("no token found");
        // }
        // const decoded= await jwt.verify(token,"BACKEND1812")
        // if(!decoded){
        //     return res.json("no student find")
        // }
        // const {userId}=decoded
        // const userdata = await studentModel.findById(userId)
        // console.log(userdata)
        // if(!userdata)
        // {
        //     return res.json("no user found ")
        // }
        const student = await studentModel.find()
        if (!student) {
            return res.json({ message: "no student found" })
        }
        res.send(student);

    } catch (error) {
        console.log(error)
    }
})
module.exports = router;