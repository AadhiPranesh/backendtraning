const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
// const Book=[{
//     id:1,
//     name:"c++",
//     author:"ssap",
//     isavaliable:"yes"
// }]
const Book = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
})
const BookModel = mongoose.model("book", Book)



router.post('/add', async(req, res) => {
  try {
    console.log('post method');
    const { name, author } = req.body; //  body destructuring
    const newBook = new BookModel({
      name,
      author,
    })
    await newBook.save()
    res.send(newBook)
  } catch (error) {
    console.log(error)
  }
})




router.get("/get", async (req, res) => {
  try {
    console.log("get method in course");
    res.send(await BookModel.find());
  } catch (error) {
    console.log(error)
  }
});
module.exports = router;