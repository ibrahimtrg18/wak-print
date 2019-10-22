const express = require('express');
const router = express.Router();

router.use("/file", require("./routes/file")); // foto
router.use("/foto", require("./routes/foto")); //user & wakprint
router.use("/history", require("./routes/history")); // user && wakprint
router.use("/pesanan", require("./routes/pesanan")); //user & wakprint
router.use("/saldo", require("./routes/saldo")); //user & wakprint
router.use("/toko", require("./routes/toko")); // search
router.use("/user", require("./routes/user")); //user
router.use("/wakprint", require("./routes/wakprint")); // wakprint

module.exports = router