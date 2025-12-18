const express = require('express');
const mongoose= require('mongoose');
const router = express.Router();

const BookModel = require("../models/BookModel")

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
    return res.json(error)
  }
})




router.get("/get", async (req, res) => {
  try {
    console.log("get method in course");
    res.send(await BookModel.find());
  } catch (error) {
    res.json({message:"error"})
  }
});
module.exports = router;