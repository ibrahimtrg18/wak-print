const mysql = require("mysql");
const key = require("./key");

// Create Connection to Mysql
const connection = mysql.createConnection({
    host: key.MYSQL_HOST,
    user: key.MYSQL_USER,
    password: key.MYSQL_PASSWORD,
    database: key.MYSQL_DATABASE
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