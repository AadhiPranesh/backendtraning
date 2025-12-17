const express = require('express');
const mongoose= require("mongoose");
const router = express.Router();
const User = new mongoose.Schema({

    name: {
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    }
})
const UserModel=mongoose.model("user",User)
router.get("/user", async(req, res) => {
    console.log("get method in course");
    try {
        res.send(await UserModel.find());
    } catch (error) {
        console.log(error)
    }
})

router.post('/add', async(req, res) => {
    console.log('post method');
   try {
     const {  name, email } = req.body; //  body destructuring
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