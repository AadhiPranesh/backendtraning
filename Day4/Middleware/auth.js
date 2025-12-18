const jwt = require("jsonwebtoken")
const mongoose= require("mongoose")
const studentModel = require("../models/studentmodel")
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

        console.log("in user data")
        if (!userdata) {
            return res.json("no user found ")
        }
                console.log(userdata)

        req.user=userId;
        req.role=userdata.role;
        next();
    } catch (error) {
        return  res.json({message:error})
    }
}
module.exports=auth;
