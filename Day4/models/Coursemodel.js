const mongoose=require('mongoose');
const courseSchema=new mongoose.Schema({
    id:{type:Number,required:true,unique:true},
    title:{type:String,required:true},
    description:{type:String,required:true}
});

const courseModel= mongoose.model('Course',courseSchema);
module.exports=courseModel;