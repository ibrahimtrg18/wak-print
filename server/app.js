const express = require('express');
const router = express.Router();

router.use("/", require("./routes/home")); // home and search
router.use("/file", require("./routes/file")); // files
// router.use("/photo", require("./routes/photo")); // photo / foto 
router.use("/order", require("./routes/order")); // order / pesanan
router.use("/history", require("./routes/history")); // history / riwayat
router.use("/balance", require("./routes/balance")); // balance / wallet / saldo
router.use("/user", require("./routes/user")); // user
router.use("/partner", require("./routes/partner")); // wakprint

module.exports = router