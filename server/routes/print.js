const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination: "./storage/print/",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
}).single("print")

checkFileType = (file, cb) => {
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

router.post("/", (req, res) => {
    let errors = [];
    upload(req, res, (err) =>{
        if(err){
            errors.push({message: err});
            res.json({errors});
        }else{
            console.log(req.file);
            res.json({message: "success"})
        }
    })
})


module.exports = router;