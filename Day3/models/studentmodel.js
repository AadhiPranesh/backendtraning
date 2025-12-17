const mongoose=require('mongoose')
const StudentSchema = new mongoose.Schema({
    name: {

        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required:true,
        
    },
    dept: {
        type: String,

    },
    age: {
        type: Number,
    },

})
const studentModel = mongoose.model("student", StudentSchema)
module.exports=studentModel;
