import mysql from 'mysql'
const dotenv = require('dotenv');
dotenv.config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();
module.exports.connection = connection






