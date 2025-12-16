const express=require('express');
const router= express.Router();
const Book=[{
    id:1,
    name:"c++",
    author:"ssap",
    isavaliable:"yes"
}]
router.post('/add',(req,res)=>{ 
    console.log('post method');
   const{id,name,author,isavaliable}=req.body; //  body destructuring
   const newBook= {id,name,author,isavaliable}
   Book.push(newBook)
    res.send(Book)
})
router.get("/book",(req,res)=>{
    console.log("get method in course");
    res.send(Book);
});
module.exports = router;