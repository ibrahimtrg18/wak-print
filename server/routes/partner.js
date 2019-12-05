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

    console.log(req.body)

    if (!email || !password || !fullName || !businessName || !phoneNumber || !address) {
        return res.status(400).json({
            success: false,
            message: "Please, fill in all data!"
        })
    }

    if (password && password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password length must be 6 or more!"
        })
    }

    if (phoneNumber && phoneNumber.length > 15) {
        return res.status(400).json({
            success: false,
            message: "Phone Number must be less than 15"
        })
    }

    connection.query("SELECT * FROM partner WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.log(err)
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
                    console.log(err)
                    return res.status(500).send()
                }
                connection.query("INSERT INTO partner SET ?", {
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
    connection.query("SELECT * FROM partner WHERE email=?", [email], (err, results) => {
        if (err) {
            console.log(err)
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
    const partnerId = req.params.partnerId;
    
    connection.query(
        `SELECT partner.*, AVG(rating.rate) AS rating, product.*
        FROM partner 
            LEFT JOIN rating 
                ON rating.partner_id = partner.id 
            LEFT JOIN product
                ON product.partner_id = partner.id
        WHERE partner.id = ${partnerId}
        GROUP BY partner.id, product.id`,
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
                            email: results[0].email,
                            password: results[0].password,
                            full_name: results[0].full_name,
                            business_name: results[0].business_name,
                            phone_number: results[0].phone_number,
                            address: results[0].address,
                            photo: results[0].photo,
                            description: results[0].description,
                        },
                        rating: results[0].rating,
                        harga: results.map(result => {
                            return ({
                                name: result.name,
                                price: result.price
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

router.get("/:partnerId/order", (req, res) => {
    const partnerId = req.params.partnerId;
    connection.query("SELECT * FROM partner WHERE partner.id=?", [partnerId], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else if (results && results.length > 0) {
            connection.query(
                `SELECT order.*, user.full_name, user.phone_number, user.photo
                FROM order
                    LEFT JOIN user
                        ON user.id = order.user_id
                WHERE order.partner_id=?`, [results[0].id], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error in Server!"
                    })
                } else if (results && results.length > 0) {
                    return res.status(200).json({
                        success: true,
                        data: results
                    })
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "No Order Today!"
                    })
                }
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Partner not found!"
            })
        }
    })

})

module.exports = router;