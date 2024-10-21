const mysql2 = require("mysql2");

const DatabaseElement = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "jobBoard",
});


DatabaseElement.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = DatabaseElement;
