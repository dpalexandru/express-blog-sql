const mysql = require("mysql2");
//creaiamo la connessione
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Inter1991",
    database: "db_blog"
})

connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("collegamento db riuscito")
        }
    }

)

module.exports = connection;