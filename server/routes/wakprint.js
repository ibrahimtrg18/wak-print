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
                    return res.status(200).json({
                        success: true,
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
    const idWakPrint = req.params.idWakPrint
    connection.query("SELECT * FROM wak_print WHERE id = ?", [idWakPrint], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "error from server/database"
            })
        } else if (results && results.length > 0) {
            return res.status(200).json({
                success: true,
                data: {
                    user: results[0]
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