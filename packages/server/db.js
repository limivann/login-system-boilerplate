const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: process.env.DB_PORT,
	password: process.env.DB_PASSWORD,
});

module.exports = pool;
