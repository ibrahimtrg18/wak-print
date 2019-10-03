const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json());
app.use(cors());

app.use("/user", require("./routes/user")); //user
app.use("/wakprint", require("./routes/wakprint")); // wakprint
app.use("/foto", require("./routes/foto")); //user & wakprint
app.use("/pesanan", require("./routes/pesanan")); //user & wakprint

app.listen(PORT, () => console.log("server port at localhost:" + PORT))