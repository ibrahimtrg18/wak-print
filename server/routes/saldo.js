const express = require("express");
const router = express.Router()

router.post("/deposit", (req, res) => {
    const { nominal } = req.body;
    return res.send(Math.floor((Math.random() * 999) + nominal).toString())
});

module.exports = router;