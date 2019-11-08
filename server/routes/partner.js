const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../config/db");

router.post("/register", (req, res) => {
    const {
        email,
        password,
        fullName,
        businessName,
        phoneNumber,
        address
    } = req.body;

    if (!email || !password || !fullName || !businessName || !phoneNumber || !address) {
        return res.status(400).json({
            success: false,
            message: "Please, fill in all data!"
        })
    }

    if (password && password.length <= 6) {
        return res.status(400).json({
            success: false,
            message: "Password length must be 6 or more!"
        })
    }

    connection.query("SELECT * FROM print_online.partner WHERE email = ?", [email], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else if (results && results.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered!"
            })
        } else {
            bcrypt.hash(password, 10, (err, passwordHashed) => {
                if (err) {
                    return res.status(500).send()
                }
                connection.query("INSERT INTO print_online.partner SET ?", {
                    email,
                    password: passwordHashed,
                    full_name: fullName,
                    business_name: businessName,
                    phone_number: phoneNumber,
                    address
                }, (err) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Error in Server!"
                        })
                    } else {
                        return res.status(201).json({
                            success: true,
                            message: "Successfully created a new Account!",
                        })
                    }
                });
            })
        }
    });
});

router.post("/login", (req, res) => {
    const {
        email,
        password
    } = req.body;

    console.log(req.body)

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please, fill in your email and password!"
        })
    }

    // Cek Email dan Password sama dengan salah satu row didalam tableUser
    connection.query("SELECT * FROM print_online.partner WHERE email=?", [email], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else {
            if (results && results.length > 0) {
                bcrypt.compare(password, results[0].password, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send()
                    }
                    if (result) {
                        return res.status(200).json({
                            success: true,
                            data: results[0]
                        });
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: "Invalid Password!"
                        })
                    }
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Email not registered!"
                })
            }
        }
    })
});

router.get("/:partnerId", (req, res) => {
    const partnerId = req.params.partnerId
    connection.query(
        `SELECT p.*, AVG(r.rate) AS rating, pd.*
        FROM print_online.partner p 
            LEFT JOIN print_online.rating r 
                ON r.partner_id = p.id 
            LEFT JOIN print_online.product pd
                ON pd.partner_id = p.id
        WHERE p.id = ${partnerId}
        GROUP BY p.id, pd.id`,
        (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "Error in Server!"
                })
            } else if (results && results.length > 0) {
                return res.status(200).json({
                    success: true,
                    data: {
                        info: {
                            id: results[0].id_wak_print,
                            namaUsaha: results[0].full_name,
                            namaPemilik: results[0].business_name,
                            alamat: results[0].address,
                            jumlahPrinter: results[0].jumlah_printer_wak_print,
                            deskripsi: results[0].description,
                            email: results[0].email,
                            password: results[0].password,
                            noTelp: results[0].phone_number,
                        },
                        rating: results[0].rating,
                        harga: results.map(result => {
                            return ({
                                jenisHarga: result.name,
                                nominalHarga: result.nominal
                            })
                        })
                    }
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "User not found!"
                })
            }
        })
})

module.exports = router;