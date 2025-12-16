const express = require('express');
const router = express.Router();
router.use(express.json())
const Course = [{
    id: 1,
    name: "Python"
}, {
    id: 2,
    name: "c++"
}, {
    id: 3,
    name: "javascript"
}]
router.get("/course", (req, res) => {
    console.log("get method in course");
    res.send(Course);
});
module.exports = router;