const express = require('express');
const router = express.Router();

const connection = require("../config/db")

router.get("/register", (req, res) => {
    res.send("register")
})

router.post("/register", (req, res) => {
    console.log(req.body);
    let { email, password, passwordConfirm, nama, nomor_hp, alamat, foto, saldo } = req.body;
    let errors;

    // Cek Panjang Password
    if (password.length < 6) {
        errors = { message: "Password harus lebih dari 6 karakter" }
    }

    // Cek Password Sama
    if (password !== passwordConfirm) {
        errors = { message: "Password tidak sama!" }
    }

    // Cek Semua terisi
    if (!email || !password || !passwordConfirm || !nama || !nomor_hp || !alamat || !foto || !saldo.toString()) {
        errors = { message: "Silakan isi semua-nya!" }
    }


    // Cek Error
    if (errors) {
        // Jika ada respon error ke client
        res.json({ errors });
    } else {
        // Memasukan kedalam table_user
        connection.query("SELECT * FROM user WHERE email=?", email, (err, results) => {
            if (err) {
                console.log(err);
                errors = { message: err }
                return res.json(errors)
            } else if (results && results.length > 0) {
                errors = { message: "Email sudah terdaftar!" }
                return res.json({ errors })
            } else {
                connection.query("INSERT INTO user SET ?", { email, password, nama, nomor_hp, alamat, foto, saldo }, (err) => {
                    if (err) {
                        errors = { message: err }
                        return res.json(errors)
                    } else {
                        return res.json({ data: { email, password, nama, nomor_hp, alamat, foto, saldo } })
                    }
                });
            }
        });
    }
});


router.get("/login", (req, res) => {
    res.send("login")
});

router.post("/login", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    let errors = {};

    // Cek Email dan Password sama dengan salah satu row didalam table_user
    connection.query("SELECT email,password FROM user WHERE email=? AND password=?", [email, password], (err, results) => {
        if (err) {
            return console.log(err);
        } else {
            if (results && results.length > 0) {
                // Jika cocok
                return res.json({ data: { results } });
            } else {
                // Jika tidak cocok
                errors = { message: "Check kembali email dan password!" }
                return res.json({ errors });
            }
        }
    });
});


module.exports = router;