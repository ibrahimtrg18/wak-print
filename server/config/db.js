const mysql = require("mysql");
const key = require("./key");

// Create Connection to Mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: key.mysqlUser,
    password: key.mysqlPassword,
    database: "print_online"
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