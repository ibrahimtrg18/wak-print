const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination: "./storage/pesanan/",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        isProfile(file, cb)
    }
})

isProfile = (file, cb) => {
    // type allowed
    const fileType = /doc|docx|pdf/;
    // check file extname after . == type allowed
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    // check file mimetype after . == type allowed
    const mimetype = fileType.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb("ERROR: DOC, DOCX & PDF Only")
    }

}

router.post("/", upload.single("pesanan"), (req, res) => {
    let errors = {};
    const file = req.file
    if (!file) {
        errors = { message: "Please Put your File" }
        return res.json({ errors })
    }
    res.json(file)
})

router.get('/download', (req, res) => {
    res.download(path.join( "../storage/pesanan/pesanan-1569044374731.docx"), err => {
        if (err)
            console.log(err)
    })
})



module.exports = router;