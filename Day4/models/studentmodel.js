const mongoose = require('mongoose')
const StudentSchema = new mongoose.Schema({
    name: {

        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,

    },
    dept: {
        type: String,

    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        enum: ['Student', 'Admin'],
        required:true
    },
    AssignedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]

})
const studentModel = mongoose.model("student", StudentSchema)
module.exports = studentModel;
