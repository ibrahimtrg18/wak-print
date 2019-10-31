const mysql = require("mysql");

// Create Connection to Mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
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