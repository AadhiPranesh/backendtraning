const express=require('express');
const router= express.Router();
const student=[{
    id:1,
    name:"aadhi",
    email:"aadhi@gmail.com"
},{
   
    id:2,
    name:"aadhi2",
    email:"aadhi2@gmail.com"
},{
   
    id:3,
    name:"aadhi3",
    email:"aadhi3@gmail.com"
}
]

console.log("hello");
setTimeout(() => {
    console.log("welcome");
}, 5000);
console.log("hi");

// post method
router.use(express.json()); // middleware to parse json body   ( then able to read req.body  , without this it will be undefined .  normal format data kku express.urlencoded use pannanum)
router.post('/add',(req,res)=>{ 
    console.log('post method');
   const{id,name,email}=req.body; //  body destructuring
   const newStudent= {id,name,email}
   student.push(newStudent)
    res.send(student)
})

//DELTE METHOD
// app.delete('/delete/',(req,res)=>{
//     console.log('delete method');
//     const id=req.body;
//     res.send(id)
// })

// app.delete('/delete/:id',(req,res)=>{
//     console.log('delete method');
//    const  {id} =req.params;
//     res.send(id)
// })

router.delete('/delete/:id',(req,res)=>{
    console.log('delete method');
   const  {id} =req.params;
   const deleted =student.filter((itmes)=>{
    return itmes.id !=id
   })
    res.send(deleted)
})


 //put method
router.put('/replace/:id',(req,res)=>{
    console.log('replace method');
   const  {id} =req.params;
   const {name}=req.body;
   const index= student.findIndex((items)=>{
    return items.id==id
   })
   student[index]={name}
 res.send(index)
})


// // get method
// app.get('/get',(req,res)=>{
//     console.log('get method');
//     res.send("get");
// })
// get student method
router.get('/student',(req,res)=>{
    res.send(student);
})
module.exports=router;