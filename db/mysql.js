const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "3717hesam",
	database: "football_reservation",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = pool;
