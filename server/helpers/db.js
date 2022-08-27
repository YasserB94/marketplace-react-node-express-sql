const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

//Check for errors if none release connection
pool.getConnection((error, connection) => {
  console.log("CHECK");
  console.log(process.env.DB_HOST);
  if (error) {
    switch (error.code) {
      case "PROTOCOL_CONNECTION_LOST":
        console.error("DB CONNECTION LOST!");
        break;
      case "ER_CON_COUNT_ERROR":
        console.error("DB RECEIVED TOO MANY CONNECTIONS");
        break;
      case "ECONNREFUSED":
        console.error("DB HAS REFUSED CONNECTION");
        break;
      case "ER_GET_CONNECTION_TIMEOUT":
        console.error("NO CONNECTION TO DATABASE");
        console.error("MAKE SURE YOU HAVE A REACHABLE MARIADB DATABASE");
        console.error(
          "CHECK YOUR .ENV FILE AND TEST YOUR CONNECTION WITH GIVEN CREDENTIALS"
        );
        break;
    }
  }
  if (connection) {
    connection.release();
  }
});
module.exports = pool;
