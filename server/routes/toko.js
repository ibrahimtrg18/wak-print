const express = require('express');
const router = express.Router();

router.get("/all",(req,res)=>{
    
})

router.get("/search", (req, res) => {
    res.send("hello")
})

module.exports = router