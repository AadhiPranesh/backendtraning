const express = require('express');
const router = express.Router();
const User = [{
    id: 1,
    name: "aadhi",
    email: "a@gmail.com"
}]
router.get("/user", (req, res) => {
    console.log("get method in course");
    res.send(User);
})

router.post('/add', (req, res) => {
    console.log('post method');
    const { id, name, email } = req.body; //  body destructuring
    const newBook = { id, name, email }
    User.push(newBook)
    res.send(Book)
})

module.exports = router;