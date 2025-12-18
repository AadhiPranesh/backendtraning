
const mongoose = require("mongoose");
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
 module.exports=BookModel;
