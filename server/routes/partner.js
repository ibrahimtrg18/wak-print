const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const fs = require('fs');
const upload = require("./photo");
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

    console.log(req.body);

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

    connection.query("SELECT * FROM partners WHERE email = ?", [email], (err, results) => {
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
                connection.query("INSERT INTO partners SET ?", {
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

    console.log(req.body);

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please, fill in your email and password!"
        })
    }

    // Cek Email dan Password sama dengan salah satu row didalam tableUser
    connection.query("SELECT * FROM partners WHERE email=?", [email], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else {
            if (results && results.length > 0) {
                bcrypt.compare(password, results[0].password, (err, result) => {
                    if (err) {
                        console.log(err);
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
        `SELECT partners.*, partners.id as id_wak_print, AVG(ratings.rate) AS ratings, products.name as product_name, products.price as product_price
        FROM partners 
            LEFT JOIN ratings 
                ON ratings.partner_id = partners.id 
            LEFT JOIN products
                ON products.partner_id = partners.id
        WHERE partners.id = ${partnerId}
        GROUP BY partners.id, products.id`,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error in Server!"
                })
            } else if (results && results.length > 0) {
                const products = results.map(result => {
                    if (result.product_name && result.product_price) {
                        return ({
                            name: result.product_name,
                            price: result.product_price
                        })
                    } else {
                        return;
                    }
                })
                if (products[0] !== undefined) {
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
                                status: results[0].status
                            },
                            rating: results[0].rating,
                            products
                        }
                    })
                } else {
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
                                status: results[0].status
                            },
                            rating: results[0].rating,
                            products: null
                        }
                    })
                }

            } else {
                return res.status(404).json({
                    success: false,
                    message: "User not found!"
                })
            }
        })
})

router.put("/:partnerId", (req, res) => {
    const partnerId = req.params.partnerId;
    const {
        fullName,
        businessName,
        phoneNumber,
        address,
        description
    } = req.body;
    console.log(req.body)
    connection.query(`UPDATE partners SET ? WHERE partners.id=${partnerId}`,
        {
            full_name: fullName,
            business_name: businessName,
            phone_number: phoneNumber,
            address: address,
            description: description
        },
        (err, results) => {
            console.log(results)
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "Error in Server!"
                })
            } else if (results && (results.affectedRows > 0 || results.changedRows > 0)) {
                return res.status(200).json({
                    success: true,
                    message: "Successfully update partner"
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: "User Not Found"
                })
            }
        })
})

router.get("/:partnerId/photo", (req, res) => {
    const partnerId = req.params.partnerId;
    connection.query("SELECT partners.photo FROM partners WHERE partners.id=?", [partnerId], (err, results) => {
        if (err) {
            console.log(err)
        } else if (results && results.length > 0) {
            console.log(results[0])
            fs.readFile("./storage/photo/" + results[0].photo, (err, data) => {
                if (err) {
                    return res.json(err);
                } else {
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.end(data);
                }
            })
        }
    })
})

router.patch("/:partnerId/photo", (req, res) => {
    const partnerId = req.params.partnerId;
    upload(req, res, (err) => {
        console.log(req.body);

        if (err) {
            return res.status(400).json({
                success: false,
                message: err
            })
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please, fill in File!"
            })
        }

        const photoName = req.file.filename

        connection.query(`UPDATE partners SET partners.photo = ? WHERE partners.id = ${partnerId}`,
            [photoName],
            (err, results) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        success: false,
                        message: "Error in Server!"
                    })
                } else if (results && (results.affectedRows > 0 || results.changedRows > 0)) {
                    return res.status(200).json({
                        success: true,
                        message: "Successfully update Photo partner"
                    })
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "User Not Found"
                    })
                }
            })
    })
})

router.patch("/:partnerId/status", (req, res) => {
    const partnerId = req.params.partnerId;
    connection.query(`UPDATE partners SET partners.status = IF(partners.status=1,0,1) WHERE partners.id = ${partnerId}`,
        (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "Error in Server!"
                })
            } else if (results && (results.affectedRows > 0 || results.changedRows > 0)) {
                return res.status(200).json({
                    success: true,
                    message: "Successfully update Photo partner"
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: "User Not Found"
                })
            }
        })
})

router.get("/:partnerId/orders", (req, res) => {
    const partnerId = req.params.partnerId;
    connection.query("SELECT * FROM partners WHERE partners.id=?", [partnerId], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else if (results && results.length > 0) {
            connection.query(
                `SELECT orders.*, users.full_name, users.phone_number, users.photo
                FROM orders
                    LEFT JOIN users
                        ON users.id = orders.user_id
                WHERE orders.partner_id=?`, [results[0].id], (err, results) => {
                if (err) {
                    console.log(err)
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
                        data: [],
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
});

module.exports = router;