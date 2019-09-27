const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    res.json("register");
});

router.post("/login", (req, res) => {
    res.json("login");
});

exports.module = router;