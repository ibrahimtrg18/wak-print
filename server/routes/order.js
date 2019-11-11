const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment");
const path = require("path");
const connection = require("../config/db");

const storage = multer.diskStorage({
    destination: "./storage/order/",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        isPrintType(file, cb)
    }
}).single("order")

isPrintType = (file, cb) => {
    // type allowed
    const fileType = /doc|docx|pdf/;
    // check file extname after . == type allowed
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    // check file mimetype after . == type allowed
    const mimetype = fileType.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(("ERROR: DOC, DOCX & PDF Only"), false);
    }

}

router.post("/", (req, res) => {
    upload(req, res, (err) => {
        const {
            userId,
            partnerId,
            pages,
            copies, // null default "1"
            productName,
            productPrice,
            methodPickup,
            methodPayment,
        } = req.body;

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

        const documentName = req.file.filename

        connection.query("INSERT INTO print_online.order SET ?", {
            user_id: userId,
            partner_id: partnerId,
            document_name: documentName,
            pages,
            copies,
            product_name: productName,
            product_price: productPrice,
            method_pickup: methodPickup,
            method_payment: methodPayment,
            created_at: Date.now()
        }, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error in Server!"
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: "Successfully made an Order!"
                })
            }
        })
    })

})

router.get("/:orderId/", (req, res) => {
    const orderId = req.params.orderId;
    connection.query("SELECT * FROM print_online.order WHERE id = ?", [orderId], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else if (results && results.length > 0) {
            return res.status(200).json({
                success: true,
                data: results[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Order not found!"
            })
        }
    })
})

router.get('/:orderId/download', (req, res) => {
    const orderId = req.params.orderId;
    connection.query("SELECT * FROM print_online.order WHERE id = ?", [orderId], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error in Server!"
            })
        } else if (results && results.length > 0) {
            return res.download(path.join(__dirname, `../storage/order/${results[0].document_name}`), (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "File not found!"
                    })
                }
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Order not found!"
            })
        }
    })
})

module.exports = router;