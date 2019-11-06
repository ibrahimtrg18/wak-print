const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
// const passport = require("passport");
// const cookieSession = require("cookie-session");
// const keys = require("./config/keys");

// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.session.cookieKey]
// }))

//initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json());

app.use(cors());

app.use("/api",require('./app'));

app.listen(PORT, () => console.log("server port at localhost:" + PORT))