const express = require("express");
const router = express.Router();
const connection = require("../config/db");

router.post("/deposit", (req, res) => {
    const { userId, nominal } = req.body;
    const paying = Math.floor((Math.random() * 999) + nominal).toString()
    connection.query("INSERT INTO deposits SET ?", {
        user_id: userId,
        nominal: nominal,
        paying: paying
    }, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Successfully made an Request Deposit"
            })
        }
    })
});

router.post("/withdraw", (req, res) => {
    const { partnerId, nominal, bankNumber } = req.body;
    console.log(req.body)
    connection.query("INSERT INTO withdraws SET ?", {
        partner_id: partnerId,
        nominal: nominal,
        bank_number: bankNumber
    }, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Successfully made an Request Withdraw"
            })
        }
    })
})

module.exports = router;