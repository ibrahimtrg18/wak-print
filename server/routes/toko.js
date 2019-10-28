const express = require('express');
const router = express.Router();

const connection = require("../config/db");

router.get("/all", (req, res) => {

})

router.get("/search", (req, res) => {
    connection.query(
        `SELECT wp.*, AVG(r.number_rating) AS rating, MIN(h.nominal_harga) min, MAX(h.nominal_harga) max
        FROM wak_print wp 
            JOIN rating r 
                ON r.id_wak_print = wp.id_wak_print 
            JOIN harga h 
                ON h.id_id_wak_print = wp.id_wak_print
        WHERE wp.nama_usaha_wak_print LIKE '%${req.query.s}%'
        GROUP BY wp.id_wak_print`,
        (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "error from server/database"
                })
            } else if (results && results.length > 0) {
                return res.status(200).json({
                    success: true,
                    data: {
                        user: results.map(result => {
                            return ({
                                info: {
                                    id: result.id_wak_print,
                                    namaUsaha: result.nama_usaha_wak_print,
                                    namaPemilik: result.nama_pemilik_usaha_wak_print,
                                    alamat: result.alamat_wak_print,
                                    jumlahPrinter: result.jumlah_printer_wak_print,
                                    deskripsi: result.deskripsi_wak_print,
                                    email: result.email_wak_print,
                                    password: result.password_wak_print,
                                    noTelp: result.no_telp_wak_print,
                                },
                                rating: result.rating,
                                harga: `${result.min} - ${result.max}` 
                            })
                        })
                    }
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                })
            }
        })
})

module.exports = router