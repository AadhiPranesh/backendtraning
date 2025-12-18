const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const UserModel = require('../models/usermodel')
const validator = require('validator');
const bcrypt = require('bcrypt');


router.post("/signup", async (req, res) => {
    try {

        const { name, email, password } = req.body;
        if (!validator.isEmail(email)) {
            return res.json("invalid email")
        }

        if (!validator.isStrongPassword(password)) {
            return res.json("give strong password")
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const signupUser = new UserModel({
            name,
            email,
            password: hashedpassword,
        })

        await signupUser.save();
        res.json({ message: "user registerd successfully", data: signupUser })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})
// login 
router.post("/user/login", async (req, res) => {
    try {
        console.log("in userlogin")
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email })
        const verifypassword = await bcrypt.compare(password, user.password)

        // const ispasswordcorrect =user.password==password
        console.log(verifypassword)
        if (verifypassword === false) {
            return res.json("invalid credreatails")
        }
        res.json({ message: "User login successfully" })
        // res.json(user)
    } catch (error) {
        res.json({ message: error.massage })

    }
})





router.get("/user", async (req, res) => {
    console.log("get method in course");
    try {
        res.send(await UserModel.find());
    } catch (error) {
        console.log(error)
    }
})

router.post('/add', async (req, res) => {
    console.log('post method');
    try {
        const { name, email } = req.body; //  body destructuring
        const newUser = new UserModel({
            name,
            email,
        })
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;