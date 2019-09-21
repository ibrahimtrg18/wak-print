const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use("/", require("./routes/users"));

app.listen(PORT, () => console.log("server port at localhost:" + PORT))