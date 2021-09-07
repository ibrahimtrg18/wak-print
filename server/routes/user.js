const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const fs = require("fs");
const upload = require("./photo");
const connection = require("../config/db");
// const passportSetup = require("../config/passport-setup");
// const passport = require("passport");

router.post("/register", (req, res) => {
    const {
        email,
        password,
        fullName,
        phoneNumber,
        address
    } = req.body;

    console.log(req.body);

    // Cek Semua terisi
    if (!email || !password || !fullName || !phoneNumber || !address) {
        return res.status(400).json({
            success: false,
            message: "Please, fill in all data!"
        })
    }

    // Cek Panjang Password
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

    // Memasukan kedalam tableUser
    connection.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else if (rows && rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered!"
            })
        } else {
            bcrypt.hash(password, 10, (err, passwordHashed) => {
                if (err) {
                    return res.status(500).send()
                }
                connection.query("INSERT INTO users SET ?", {
                    email,
                    password: passwordHashed,
                    full_name: fullName,
                    phone_number: phoneNumber,
                    address
                }, (err) => {
                    if (err) {
                        console.log(err);
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
            });
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
            message: "Please, fill in your Email and Password!"
        });
    }

    // Cek Email dan Password sama dengan salah satu row didalam tableUser
    connection.query("SELECT * FROM users WHERE email=?", [email], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else {
            if (rows && rows.length > 0) {
                bcrypt.compare(password, rows[0].password, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send()
                    }
                    if (result) {
                        return res.status(200).json({
                            success: true,
                            data: rows[0]
                        });
                    }
                    return res.status(401).json({
                        success: false,
                        message: "Invalid Password!"
                    })
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

router.get("/:userId", (req, res) => {
    const userId = req.params.userId;

    connection.query("SELECT * FROM users WHERE id = ?", [userId], (err, rows) => {
        if (err) {
            return res.json(err)
        } else if (rows && rows.length > 0) {
            return res.status(200).json({
                success: true,
                data: {
                    user: rows[0]
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
    })
});

router.put("/:userId", (req, res) => {
    const userId = req.params.userId;
    const {
        fullName,
        phoneNumber,
        address
    } = req.body;
    
    if (phoneNumber && phoneNumber.length > 15) {
        return res.status(400).json({
            success: false,
            message: "Phone Number must be less than 15"
        })
    }
    
    connection.query(`UPDATE users SET ? WHERE users.id=${userId}`,
        {
            full_name: fullName,
            phone_number: phoneNumber,
            address: address
        },
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
                    message: "Successfully update user"
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: "User Not Found"
                })
            }
        })
})

router.get("/:userId/photo", (req, res) => {
    const userId = req.params.userId;
    connection.query("SELECT users.photo FROM users WHERE users.id=?", [userId], (err, results) => {
        if (err) {
            return console.log(err)
        } else if (results && results.length > 0) {
            console.log(results[0])
            fs.readFile("./storage/photo/"+results[0].photo, (err, data) => {
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

router.patch("/:userId/photo", (req, res) => {
    const userId = req.params.userId;
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

        connection.query(`UPDATE users SET users.photo = ? WHERE users.id = ${userId}`,
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
                        message: "Successfully update Photo user"
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

// router.get("/auth/google", passport.authenticate("google", {
//     scope: ["email", "profile"]
// }));

// router.get("/logout", (req, res) => {
//     req.logout();
// })

// router.get("/auth/google/redirect", passport.authenticate("google"), (req, res) => {
//     res.redirect("/user/auth/" + req.user)
// })

module.exports = router;