const express = require('express');
const { default: mongoose, Types } = require('mongoose');
const router = express.Router();
const auth=require("../Middleware/auth")
router.use(express.json())
// const Course = [{
//     id: 1,
//     name: "Python"
// }, {
//     id: 2,
//     name: "c++"
// }, {
//     id: 3,
//     name: "javascript"
// }]
const Course = new mongoose.Schema({
    name: {
        type: String,
        required: true

    }
})
const CourseModel=mongoose.model("course",Course)
router.get("/course",auth, async (req, res) => {
    try {
        console.log("get method in course");
        res.send(await CourseModel.find());
    } catch (error) {
        console.log(error)
    }
});
    //post
    router.post('/course/add', auth,async (req, res) => {
        console.log('post method');
        try {
            const { name } = req.body; //  body destructuring
            //    const newStudent= {id,name,email}
            //    student.push(newStudent) 
            const newCourse = new CourseModel({
                name,
            })
            await newCourse.save()
            res.send(newCourse)
        }
        catch (error) {
            res.send(error);
        }
    })

module.exports = router;