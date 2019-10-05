const express = require('express');
const passport = require("passport");
const router = express.Router();
const passportSetup = require("../config/passport-setup")
const connection = require("../config/db")

router.post("/register", (req, res) => {
    const {
        emailUser,
        passwordUser,
        passwordConfirmUser,
        namaUser,
        nomorHpUser,
        alamatUser,
        fotoUser
    } = req.body;
    let errors;

    // Cek Panjang Password
    if (passwordUser && passwordUser.length < 6) {
        errors = {
            message: "Password harus lebih dari 6 karakter"
        }
    }

    // Cek Password Sama
    if (passwordUser !== passwordConfirmUser) {
        errors = {
            message: "Password tidak sama!"
        }
    }

    // Cek Semua terisi
    if (!emailUser || !passwordUser || !passwordConfirmUser || !namaUser || !nomorHpUser || !alamatUser) {
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
        // Memasukan kedalam tableUser
        connection.query("SELECT * FROM user WHERE email_user = ?", emailUser, (err, results) => {
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
                connection.query("INSERT INTO user SET ?", {
                    email_user: emailUser,
                    password_user: passwordUser,
                    nama_user: namaUser,
                    nomor_hp_user: nomorHpUser,
                    alamat_user: alamatUser,
                    foto_user: fotoUser
                }, (err) => {
                    if (err) {
                        errors = {
                            message: err
                        }
                        return res.json(errors)
                    } else {
                        return res.json({
                            data: {
                                emailUser,
                                passwordUser,
                                namaUser,
                                nomorHpUser,
                                alamatUser,
                                fotoUser
                            }
                        })
                    }
                });
            }
        });
    }
});

router.post("/login", (req, res) => {
    console.log(req.body);
    const {
        emailUser,
        passwordUser
    } = req.body;
    let errors = {};

    // Cek Email dan Password sama dengan salah satu row didalam tableUser
    connection.query("SELECT * FROM user WHERE email_user=? AND password_user=?", [emailUser, passwordUser], (err, results) => {
        if (err) {
            return console.log(err);
        } else {
            if (results && results.length > 0) {
                // Jika cocok
                return res.json({
                    data: {
                        results
                    }
                });
            } else {
                // Jika tidak cocok
                errors = {
                    message: "Check kembali email dan password!"
                }
                return res.json({
                    errors
                });
            }
        }
    });
});

router.get("/auth/google", passport.authenticate("google", {
    scope: ["email", "profile"]
}));

router.get("/auth/google/redirect", passport.authenticate("google"), (req, res) => {
    console.log(req.user)
    connection.query("SELECT * FROM user WHERE id_user = ?", req.user, (err, result) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(result[0])
        }
    })
})

module.exports = router;