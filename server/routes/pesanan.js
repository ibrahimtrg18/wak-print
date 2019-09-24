const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const connection = require("../config/db")

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
        return cb("ERROR: DOC, DOCX & PDF Only")
    }

}

router.post("/", upload.single("pesanan"), (req, res) => {
    let errors = {};
    const file = req.file
    const {
        id_user,
        id_wak_print,
        jumlah_halaman_pesanan,
        jumlah_rangkap_pesanan,
        timbal_balik_pesanan,
        orientasi_halaman_pesanan,
        jenis_kertas_pesanan,
        total_harga_pesanan,
        metode_pengambilan_pesanan,
        metode_pembayaran_pesanan,
        status_pesanan,
        status_pembayaran
    } = req.body;

    if (!file) {
        errors = { message: "Please Put your File" }
        return res.json({ errors })
    }
    // res.json(file.filename)
    const dokumen_user = file.filename

    connection.query("INSERT INTO pesanan SET ?",
    {
        id_user,
        id_wak_print,
        dokumen_user,
        jumlah_halaman_pesanan,
        jumlah_rangkap_pesanan,
        timbal_balik_pesanan,
        orientasi_halaman_pesanan,
        jenis_kertas_pesanan,
        total_harga_pesanan,
        metode_pengambilan_pesanan,
        metode_pembayaran_pesanan,
        status_pesanan,
        status_pembayaran        
    },(err,results)=>{
        if(err){
            return console.log(err);
        }else{
            return console.log(results);
        }
    })
})

router.get('/download', (req, res) => {
    res.download(path.join(__dirname, "../storage/pesanan/pesanan-1569239197083.docx"), err => {
        if (err)
            console.log(err)
    })
})



module.exports = router;