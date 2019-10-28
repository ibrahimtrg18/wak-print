const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const connection = require("../config/db");

router.post("/register", (req, res) => {
    const {
        email,
        password,
        full_name,
        business_name,
        phone_number,
        address,
        description,
    } = req.body;

    console.log(req.body)

    if (!email || !password || !full_name || !business_name || !phone_number || !address || !description) {
        return res.status(400).json({
            success: false,
            message: "tolong isi semua data!"
        })
    }

    if (password && password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "password harus lebih dari 6!"
        })
    }

    connection.query("SELECT * FROM partner WHERE email = ?", [email], (err, results) => {
        if (err) {
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
            bcrypt.hash(password, 10, (err, passwordHashed) => {
                connection.query("INSERT INTO partner SET ?", {
                    email,
                    password: passwordHashed,
                    full_name,
                    business_name,
                    phone_number,
                    address,
                    description
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
                            // data: {
                            //     email,
                            //     password,
                            //     full_name,
                            //     business_name,
                            //     phone_number,
                            //     address,
                            //     description,
                            // }
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

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "tolong isi semua data!"
        })
    }

    // Cek Email dan Password sama dengan salah satu row didalam tableUser
    connection.query("SELECT * FROM partner WHERE email=?", [email], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "ada kesalah didalam query database"
            })
        } else {
            if (results && results.length > 0) {
                bcrypt.compare(password, results[0].password, (err, result) => {
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