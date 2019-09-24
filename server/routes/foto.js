const express = require('express');
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
    destination: "./storage/foto/",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        isFotoProfileType(file, cb)
    }
})

isFotoProfileType = (file, cb) => {
    // type allowed
    const fileType = /jpg|jpeg|png/;
    // check file extname after . == type allowed
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    // check file mimetype after . == type allowed
    const mimetype = fileType.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb("ERROR: Image Only")
    }
}

router.post("/", upload.single("foto"), (req, res) => {
    let errors;
    const file = req.file;
    if (!file) {
        errors = { message: "Please Put your Image" };
        return res.json({ errors })
    }
    res.json(file)
})

router.get('/', (req, res) => {
    fs.readFile("./storage/print/print-1569044374731.doxc", (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.send(data)
        }
    })
})

module.exports = router;