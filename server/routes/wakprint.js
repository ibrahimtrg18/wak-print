const express = require("express");
const router = express.Router();

const connection = require("../config/db");

router.post("/register", (req, res) => {
    const {
        nama_usaha_wak_print,
        nama_pemilik_usaha_wak_print,
        alamat_wak_print,
        jumlah_printer_wak_print,
        deskripsi_wak_print,
        email_wak_print,
        password_wak_print,
        no_telp_wak_print,
    } = req.body;

    console.log(req.body)

    // Cek Semua terisi
    if (!nama_usaha_wak_print ||
        !nama_pemilik_usaha_wak_print ||
        !alamat_wak_print ||
        !jumlah_printer_wak_print ||
        !deskripsi_wak_print ||
        !email_wak_print ||
        !password_wak_print ||
        !no_telp_wak_print) {
        return res.status(400).json({
            success: false,
            message: "tolong isi semua data!"
        })
    }

    if (password_wak_print && password_wak_print.length < 6) {
        return res.status(400).json({
            success: false,
            message: "password harus lebih dari 6!"
        })
    }

    // Memasukan kedalam table WakPrint
    connection.query("SELECT * FROM wak_print WHERE email_wak_print = ?", email_wak_print, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "ada kesalah didalam query database!"
            })
        } else if (results && results.length > 0) {
            return res.status(409).json({
                success: false,
                message: "email anda sudah terdaftar!"
            })
        } else {
            connection.query("INSERT INTO wak_print SET ?", {
                nama_usaha_wak_print,
                nama_pemilik_usaha_wak_print,
                alamat_wak_print,
                jumlah_printer_wak_print,
                deskripsi_wak_print,
                email_wak_print,
                password_wak_print,
                no_telp_wak_print,
            }, (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "ada kesalah didalam query database!"
                    })
                } else {
                    return res.status(201).json({
                        success: true,
                        message: "Succes to create User Wak Print",
                        data: {
                            nama_usaha_wak_print,
                            nama_pemilik_usaha_wak_print,
                            alamat_wak_print,
                            jumlah_printer_wak_print,
                            deskripsi_wak_print,
                            email_wak_print,
                            password_wak_print,
                            no_telp_wak_print,
                        }
                    })
                }
            });
        }
    });
});

router.post("/login", (req, res) => {
    const {
        email_wak_print,
        password_wak_print
    } = req.body;

    // Cek Email dan Password sama dengan salah satu row didalam tableWakPrint
    connection.query("SELEcT * FROM wak_print WHERE email_wak_print=?", [email_wak_print], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "ada kesalah didalam query database!"
            })
        } else {
            if (results && results.length > 0) {
                connection.query("SELECT * FROM wak_print WHERE email_wak_print=? AND password_wak_print=?", [email_wak_print, password_wak_print], (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: false,
                            message: "ada kesalah didalam query database!"
                        })
                    } else {
                        if (results && results.length > 0) {
                            // Jika cocok
                            wak_print = results[0]
                            return res.status(200).json({
                                success: true,
                                data: {
                                    wak_print
                                }
                            });
                        } else {
                            // Jika tidak cocok
                            return res.status(401).json({
                                success: false,
                                message: "Email dan Password salah!"
                            })
                        }
                    }
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: "Email anda belum terdaftar"
                })
            }
        }
    })

});

router.get("/:idWakPrint", (req, res) => {
    connection.query(
        `SELECT wp.*, AVG(r.number_rating) AS rating, h.*
        FROM wak_print wp 
            JOIN rating r 
                ON r.id_wak_print = wp.id_wak_print 
            JOIN harga h 
                ON h.id_id_wak_print = wp.id_wak_print
        WHERE wp.id_wak_print = ${req.params.idWakPrint}
        GROUP BY wp.id_wak_print, h.id_harga`,
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
                        user: {
                            info: {
                                id: results[0].id_wak_print,
                                namaUsaha: results[0].nama_usaha_wak_print,
                                namaPemilik: results[0].nama_pemilik_usaha_wak_print,
                                alamat: results[0].alamat_wak_print,
                                jumlahPrinter: results[0].jumlah_printer_wak_print,
                                deskripsi: results[0].deskripsi_wak_print,
                                email: results[0].email_wak_print,
                                password: results[0].password_wak_print,
                                noTelp: results[0].no_telp_wak_print,
                            },
                            rating: results[0].rating,
                            harga: results.map(result => {
                                return ({
                                    jenisHarga: result.jenis_harga,
                                    nominalHarga: result.nominal_harga
                                })
                            })
                        },
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

module.exports = router;