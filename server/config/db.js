const mysql = require("mysql");

// Create Connection to Mysql
const connection = mysql.createConnection({
    host: "localhost",
    port:"3306",
    database: "wak_print",
    user: "root",
    password: "123456"
})

// Connect to Mysql
connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("success connection to database");
})

module.exports = connection;