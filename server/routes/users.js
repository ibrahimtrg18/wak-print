const express = require('express');
const router = express.Router();

const connection = require("../config/db")

router.get("/register", (req, res) => {
    res.send("register")
})

router.post("/register", (req, res) => {
    console.log(req.body);
    const { name, email, password, passwordConfirm } = req.body;
    let errors = [];

    // res.send(name+"\n"+email+"\n"+password+"\n"+passwordConfirm);

    // Cek Semua terisi
    if (!name || !email || !password || !passwordConfirm) {
        errors.push({ message: "Silakan isi semua-nya!" })
    }

    // Cek Password Sama
    if (password !== passwordConfirm) {
        errors.push({ message: "Password tidak sama!" })
    }

    // Cek Panjang Password
    if (password.length > 6) {
        error.push({ message: "Password harus lebih dari 6 karakter" })
    }

    // Cek Error
    if (errors.length > 0) {
        // Jika ada respon error ke client
        res.json({ errors });
    } else {
        // Memasukan kedalam table_user
        connection.query("SELECT * FROM table_user WHERE email=?", email, (err, results) => {
            if (err) {
                return console.log(err);
            } else if (results && results.length > 0) {
                errors.push({ message: "Email sudah terdaftar!" });
                return res.json({ errors });
            } else {
                connection.query("INSERT INTO table_user SET ?", { name, email, password }, (err) => {
                    if (err) {
                        return console.log(err);
                    } else {
                        return res.json({ data: { name, email, password } })
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
    const errors = [];

    // Cek Email dan Password sama dengan salah satu row didalam table_user
    connection.query("SELECT email,password FROM table_user WHERE email=? AND password=?", [email, password], (err, results) => {
        if (err) {
            return console.log(err);
        } else {
            if (results && results.length > 0) {
                // Jika cocok
                return res.json({ data: { results } });
            } else {
                // Jika tidak cocok
                errors.push({ message: "Check kembali email dan password!" });
                return res.json({ errors });
            }
        }
    });
});


module.exports = router;