const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    const {
        emailWakPrint,
        passwordWakPrint,
        passwordConfirmWakPrint,
        namaWakPrint,
        nomorHpWakPrint,
        alamatWakPrint,
        hargaWakPrint,
        fotoWakPrint,
    } = req.body;
    let errors;

    if (passwordWakPrint && passwordWakPrint.length < 6) {
        errors = {
            message: "Password harus lebih dari 6 karakter"
        }
    }

    // Cek Password Sama
    if (passwordWakPrint !== passwordConfirmWakPrint) {
        errors = {
            message: "Password tidak sama!"
        }
    }

    // Cek Semua terisi
    if (!emailWakPrint || !passwordWakPrint || !passwordConfirmWakPrint || !namaWakPrint || !nomorHpWakPrint || !alamatWakPrint) {
        errors = {
            message: "Silakan isi semua-nya!"
        }
    }

    // Cek Error
    if (errors) {
        // Jika ada error dari client
        res.json({
            errors
        });
    } else {
        // Memasukan kedalam table WakPrint
        connection.query("SELECT * FROM wak_print WHERE email_wak_print = ?", emailWakPrint, (err, results) => {
            if (err) {
                errors = {
                    message: err
                }
                return res.json(errors)
            } else if (results && results.length > 0) {
                errors = {
                    message: "Email sudah terdaftar!"
                }
                return res.json({
                    errors
                })
            } else {
                connection.query("INSERT INTO wak_print SET ?", {
                    email_wak_print: emailWakPrint,
                    password_wak_print: passwordWakPrint,
                    nama_wak_print: namaWakPrint,
                    nomor_hp_wak_print: nomorHpWakPrint,
                    alamat_wak_print: alamatWakPrint,
                    harga_wak_print: hargaWakPrint,
                    foto_wak_print: fotoWakPrint
                }, (err) => {
                    if (err) {
                        errors = {
                            message: err
                        }
                        return res.json(errors)
                    } else {
                        return res.json({
                            data: {
                                emailWakPrint,
                                passwordWakPrint,
                                namaWakPrint,
                                nomorHpWakPrint,
                                alamatWakPrint,
                                hargaWakPrint,
                                fotoWakPrint
                            }
                        })
                    }
                });
            }
        });
    }
});

router.post("/login", (req, res) => {
    res.json("login");
});

module.exports = router;