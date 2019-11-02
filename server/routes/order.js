const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const connection = require("../config/db");

const storage = multer.diskStorage({
    destination: "./storage/order/",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        isPrintType(file, cb)
    }
})

isPrintType = (file, cb) => {
    // type allowed
    const fileType = /doc|docx|pdf/;
    // check file extname after . == type allowed
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    // check file mimetype after . == type allowed
    const mimetype = fileType.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb("ERROR: DOC, DOCX & PDF Only");
    }

}

router.post("/", upload.single("order"), (req, res) => {
    const {
        userId,
        partnerId,
        pages,
        copies,
        layout,
        paper,
        takingMethod,
        paymentMethod,
        orderStatus,
        paymentStatus
    } = req.body;

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Put File Please!"
        })
    }
    // res.json(file.filename)
    const document = req.file.filename

    return res.status(200).send(document);

    // connection.query("INSERT INTO order SET ?", {
    //     user_id: userId,
    //     partner_id: partnerId,
    //     document,
    //     pages,
    //     copies,
    //     layout,
    //     paper,
    //     takingMethod,
    //     paymentMethod,
    //     orderStatus,
    //     paymentStatus,
    //     create_at
    // }, (err, results) => {
    //     if (err) {
    //         return console.log(err);
    //     } else {
    //         return console.log(results);
    //     }
    // })
})

router.get("/:idPesanan/", (req, res) => {
    console.log(req.params.idPesanan)
    connection.query("SELECT * FROM pesanan WHERE id_pesanan = ?", req.params.idPesanan, (err, results) => {
        if (err) {
            return console.log(err);
        } else {
            return res.json(results)
        }
    })
})

router.get('/download', (req, res) => {
    res.download(path.join(__dirname, "../storage/pesanan/pesanan-1569239197083.docx"), (err) => {
        if (err)
            console.log(err)
    })
})



module.exports = router;