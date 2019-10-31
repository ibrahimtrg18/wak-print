const express = require('express');
const router = express.Router();
const connection = require("../config/db");

router.get("/all", (req, res) => {

})

router.get("/search", (req, res) => {
    connection.query(
        `SELECT p.id AS partner_id, p.*, AVG(r.rate) AS rating, MIN(s.nominal) min, MAX(s.nominal) max
        FROM partner p 
            LEFT JOIN rating r 
                ON r.partner_id = p.id 
            LEFT JOIN selling s 
                ON s.partner_id = p.id
        WHERE p.business_name LIKE '%${req.query.s}%'
        GROUP BY p.id`,
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
                    data: results.map(result => {
                        return ({
                            info: {
                                id: result.id,
                                businessName: result.partner_id,
                                fullName: result.full_name,
                                address: result.address,
                                phoneNumber: result.phone_number,
                            },
                            rating: result.rating,
                            harga: {
                                min: result.min,
                                max: result.max
                            }
                        })
                    })
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                })
            }
        })
})

module.exports = router