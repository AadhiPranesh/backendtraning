const express = require('express');
const router = express.Router();

router.use(express.json());
const bcrypt = require('bcrypt')
const validator = require('validator')
const studentModel = require("../models/studentmodel")

// Admin Login
router.post("/admin/login", async (req, res) => {
    try {
        console.log("check")
        const { email, password } = req.body;
        const user = await studentModel.findOne({ email: email })
        console.log(user)
        const verifypassword = await bcrypt.compare(password, user.password)
        console.log(user.role)
        if (user.role !== 'Admin') {
            return res.json("Access Denied !")
        }

        console.log("user.name")
        console.log(verifypassword)
        if (verifypassword === false) {
            return res.json("invalid credreatails")
        }
        console.log(user.name)
        // res.json(`message:${user.name} login successfully`)
        res.json({message:"Admin login successfull !"})
    } catch (error) {
        res.json({ message: error.massage })

    }
})

module.exports = router;