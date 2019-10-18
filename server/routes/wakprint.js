const express = require("express");
const router = express.Router();

const connection = require("../config/db");

router.post("/register", (req, res) => {
    const {
        email_wak_print,
        password_wak_print,
        password_confirm_wak_print,
        nama_wak_print,
        nomor_hp_wak_print,
        alamat_wak_print,
        harga_wak_print,
        foto_wak_print,
    } = req.body;

    // Cek Semua terisi
    if (!email_wak_print || !password_wak_print || !password_confirm_wak_print || !nama_wak_print || !nomor_hp_wak_print || !alamat_wak_print) {
        return res.status(400).json({
            status: "fail",
            message: "tolong isi semua data!"
        })
    }

    if (password_wak_print && password_wak_print.length < 6) {
        return res.status(400).json({
            status: "fail",
            message: "password harus lebih dari 6!"
        })
    }

    // Cek Password Sama
    if (password_wak_print !== password_confirm_wak_print) {
        return res.status(400).json({
            status: "fail",
            message: "password tidak sama!"
        })
    }

    // Memasukan kedalam table WakPrint
    connection.query("SELECT * FROM wak_print WHERE email_wak_print = ?", email_wak_print, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                status: "error",
                message: "ada kesalah didalam query database!"
            })
        } else if (results && results.length > 0) {
            return res.status(409).json({
                status: "fail",
                message: "email anda sudah terdaftar!"
            })
        } else {
            connection.query("INSERT INTO wak_print SET ?", {
                email_wak_print,
                password_wak_prin,
                nama_wak_print,
                nomor_hp_wak_print,
                alamat_wak_print,
                harga_wak_print,
                foto_wak_print
            }, (err) => {
                if (err) {
                    return res.status(500).json({
                        status: "error",
                        message: "ada kesalah didalam query database!"
                    })
                } else {
                    return res.status(200).json({
                        status: "success",
                        data: {
                            email_wak_print,
                            password_wak_print,
                            nama_wak_print,
                            nomor_hp_wak_print,
                            alamat_wak_print,
                            harga_wak_print,
                            foto_wak_print
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
                status: "error",
                message: "ada kesalah didalam query database!"
            })
        } else {
            if (results && results.length > 0) {
                connection.query("SELECT * FROM wak_print WHERE email_wak_print=? AND password_wak_print=?", [email_wak_print, password_wak_print], (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            status: "error",
                            message: "ada kesalah didalam query database!"
                        })
                    } else {
                        if (results && results.length > 0) {
                            // Jika cocok
                            wak_print = results[0]
                            return res.status(200).json({
                                status: "success",
                                data: {
                                    wak_print
                                }
                            });
                        } else {
                            // Jika tidak cocok
                            return res.status(401).json({
                                status: "fail",
                                message: "Email dan Password salah!"
                            })
                        }
                    }
                });
            }
            else {
                return res.status(401).json({
                    status: "fail",
                    message: "Email anda belum terdaftar"
                })
            }
        }
    })

});

module.exports = router;