const express = require('express');
const router = express.Router();

router.use("/file", require("./file")); // foto
router.use("/foto", require("./foto")); //user & wakprint
router.use("/history", require("./history")); // user && wakprint
router.use("/pesanan", require("./pesanan")); //user & wakprint
router.use("/saldo", require("./saldo")); //user & wakprint
router.use("/toko", require("./toko")); // search
router.use("/user", require("./user")); //user
router.use("/wakprint", require("./wakprint")); // wakprint

module.exports = router