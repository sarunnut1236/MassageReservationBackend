const mysql = require('mysql');
const dotenv = require('dotenv');

// Load env variables
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
dotenv.config({ path: "./config/config.env" });
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */

let connection = mysql.createPool({
    host: 'localhost', // Your host
    user: 'root',
    password: process.env.MYSQL_PASSWORD || '12345678',
    database: 'vacCenter',
});

module.exports = connection;