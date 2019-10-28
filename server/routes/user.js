const express = require('express');
const passport = require("passport");
const bcrypt = require("bcrypt");

const router = express.Router();
const passportSetup = require("../config/passport-setup");
const connection = require("../config/db");

router.post("/register", (req, res) => {
    console.log(req.body);
    const {
        email_user,
        password_user,
        nama_lengkap_user,
        nomor_hp_user,
        alamat_user,
    } = req.body;

    // Cek Semua terisi
    if (!email_user || !password_user || !nama_lengkap_user || !nomor_hp_user || !alamat_user) {
        return res.status(400).json({
            success: false,
            message: "tolong isi data anda!"
        })
    }

    // Cek Panjang Password
    if (password_user && password_user.length < 6) {
        return res.status(400).json({
            success: false,
            message: "password harus lebih dari 6!"
        })
    }

    // Memasukan kedalam tableUser
    connection.query("SELECT * FROM user WHERE email_user = ?", email_user, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "ada kesalah didalam query database"
            })
        } else if (results && results.length > 0) {
            return res.status(409).json({
                success: false,
                message: "email anda sudah terdaftar!"
            })
        } else {
            bcrypt.hash(password_user, 10, (err, passwordHashed) => {
                connection.query("INSERT INTO user SET ?", {
                    email_user,
                    password_user: passwordHashed,
                    nama_lengkap_user,
                    nomor_hp_user,
                    alamat_user
                }, (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            success: false,
                            message: "ada kesalah didalam query database"
                        })
                    } else {
                        return res.status(201).json({
                            success: true,
                            message: "Berhasil membuat account Wak Print",
                            data: {
                                email_user,
                                password_user,
                                nama_lengkap_user,
                                nomor_hp_user,
                                alamat_user
                            }
                        })
                    }
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    console.log(req.body);
    const {
        email_user,
        password_user
    } = req.body;

    if (!email_user || !password_user) {
        return res.status(400).json({
            success: false,
            message: "Tolong isi email dan password anda!"
        });
    }

    // Cek Email dan Password sama dengan salah satu row didalam tableUser
    connection.query("SELECT * FROM user WHERE email_user=?", [email_user], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "ada kesalah didalam query database"
            })
        } else {
            if (results && results.length > 0) {
                bcrypt.compare(password_user, results[0].password_user, (err, result) => {
                    if (result) {
                        return res.status(200).json({
                            success: true,
                            data: results[0]
                        });
                    }
                    return res.status(401).json({
                        succes: false,
                        message: "Email dan Password anda salah!"
                    })
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "email anda belum terdaftar"
                })
            }
        }
    })
});

router.get("/auth/google", passport.authenticate("google", {
    scope: ["email", "profile"]
}));

// router.get("/logout", (req, res) => {
//     req.logout();
// })

router.get("/auth/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/user/auth/" + req.user)
})

router.get("/:idUser", (req, res) => {
    connection.query(
        `SELECT * FROM user WHERE id_user = ${req.params.idUser}`,
        (err, results) => {
            if (err) {
                return res.json(err)
            } else if (results && results.length > 0) {
                return res.status(200).json({
                    success: true,
                    data: {
                        user: results[0]
                    }
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                })
            }
        })
})

module.exports = router;