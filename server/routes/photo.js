const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: "./storage/photo/",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        isFotoProfileType(file, cb)
    }
}).single("photo")

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
};

module.exports = upload;