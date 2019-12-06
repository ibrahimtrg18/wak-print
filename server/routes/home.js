const express = require('express');
const router = express.Router();
const connection = require("../config/db");

router.get("/all", (req, res) => {

})

router.get("/search", (req, res) => {
    connection.query(
        `SELECT partner.id AS partner_id, partner.*, AVG(rating.rate) AS rating, MIN(product.price) min, MAX(product.price) max
        FROM partner 
            LEFT JOIN rating 
                ON rating.partner_id = partner.id 
            LEFT JOIN product
                ON product.partner_id = partner.id
        WHERE partner.business_name LIKE '%${req.query.s}%'
        GROUP BY partner.id`,
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