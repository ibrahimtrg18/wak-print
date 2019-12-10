const express = require('express');
const router = express.Router();
const connection = require("../config/db");

router.get("/all", (req, res) => {

})

router.get("/search", (req, res) => {
    connection.query(
        `SELECT partners.id AS partner_id, partners.*, AVG(ratings.rate) AS rating, MIN(products.price) min, MAX(products.price) max
        FROM partners 
            LEFT JOIN ratings 
                ON ratings.partner_id = partners.id 
            LEFT JOIN products
                ON products.partner_id = partners.id
        WHERE partners.business_name LIKE '%${req.query.s}%'
        GROUP BY partners.id`,
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
                                businessName: result.business_name,
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