const express = require('express');
const passport = require("passport");
const router = express.Router();
const passportSetup = require("../config/passport-setup")
const connection = require("../config/db")

router.post("/register", (req, res) => {
    console.log(req.body);
    const {
        email_user,
        password_user,
        password_confirm_user,
        nama_lengkap_user,
        nomor_hp_user,
        alamat_user,
        foto_user
    } = req.body;

    // Cek Semua terisi
    if (!email_user || !password_user || !password_confirm_user || !nama_lengkap_user || !nomor_hp_user || !alamat_user) {
        return res.status(400).json({
            status: "fail",
            message: "tolong isi data anda!"
        })
    }

    // Cek Panjang Password
    if (password_user && password_user.length < 6) {
        return res.status(400).json({
            status: "fail",
            message: "password harus lebih dari 6!"
        })
    }

    // Cek Password Sama
    if (password_user !== password_confirm_user) {
        return res.status(400).json({
            status: "fail",
            message: "password tidak sama!"
        })
    }

    // Memasukan kedalam tableUser
    connection.query("SELECT * FROM user WHERE email_user = ?", email_user, (err, results) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "ada kesalah didalam query database"
            })
        } else if (results && results.length > 0) {
            return res.status(409).json({
                status: "fail",
                message: "email anda sudah terdaftar!"
            })
        } else {
            connection.query("INSERT INTO user SET ?", {
                email_user,
                password_user,
                nama_lengkap_user,
                nomor_hp_user,
                alamat_user,
                foto_user
            }, (err) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        status: "error",
                        message: "ada kesalah didalam query database"
                    })
                } else {
                    return res.status(200).json({
                        status: "success",
                        data: {
                            email_user,
                            password_user,
                            nama_lengkap_user,
                            nomor_hp_user,
                            alamat_user,
                            foto_user
                        }
                    })
                }
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
            status: "error",
            message: "Tolong isi email dan password anda!"
        });
    }

    // Cek Email dan Password sama dengan salah satu row didalam tableUser
    connection.query("SELECT * FROM user WHERE email_user=? AND password_user=?", [email_user, password_user], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "ada kesalah didalam query database"
            })
        } else {
            if (results && results.length > 0) {
                // Jika cocok
                user = results[0]
                return res.status(200).json({
                    status: "success",
                    data: {
                        user
                    }
                });
            } else {
                // Jika tidak cocok
                return res.status(401).json({
                    status: "fail",
                    message: "Email dan Password salah!"
                });
            }
        }
    });
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

router.get("/auth/:idUser", (req, res) => {
    connection.query("SELECT * FROM user WHERE id_user = ?", req.params.idUser, (err, result) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(result[0])
        }
    })
})


module.exports = router;