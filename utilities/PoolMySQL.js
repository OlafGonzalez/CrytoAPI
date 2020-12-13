var mysql = require('mysql');
require('dotenv').config();
var pool  = mysql.createPool({
  connectionLimit : 20,
  host:     process.env.MYSQL_HOST,
  user:     process.env.MYSQL_USER,
  port:     process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = pool

