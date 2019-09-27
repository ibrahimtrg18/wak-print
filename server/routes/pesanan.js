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
    const {
        idUser,
        idWakPrint,
        jumlahHalamanPesanan,
        jumlahRangkapPesanan,
        timbalBalikPesanan,
        orientasiHalamanPesanan,
        jenisKertasPesanan,
        totalHargaPesanan,
        metodePengambilanPesanan,
        metodePembayaranPesanan,
        statusPesanan,
        statusPembayaran
    } = req.body;

    if (!req.file) {
        errors = { message: "Please Put your File" }
        return res.json({ errors })
    }
    // res.json(file.filename)
    const dokumenUser = req.file.filename

    connection.query("INSERT INTO pesanan SET ?", {
        id_user : idUser,
        id_wak_print : idWakPrint,
        dokumen_user : dokumenUser,
        jumlah_halaman_pesanan : jumlahHalamanPesanan,
        jumlah_rangkap_pesanan : jumlahRangkapPesanan,
        timbal_balik_pesanan : timbalBalikPesanan,
        orientasi_halaman_pesanan : orientasiHalamanPesanan,
        jenis_kertas_pesanan : jenisKertasPesanan,
        total_harga_pesanan : totalHargaPesanan,
        metode_pengambilan_pesanan :metodePengambilanPesanan,
        metode_pembayaran_pesanan : metodePembayaranPesanan,
        status_pesanan : statusPesanan,
        status_pembayaran : statusPembayaran
    }, (err, results) => {
        if (err) {
            return console.log(err);
        } else {
            return console.log(results);
        }
    })
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
    res.download(path.join(__dirname, "../storage/pesanan/pesanan-1569239197083.docx"), err => {
        if (err)
            console.log(err)
    })
})



module.exports = router;