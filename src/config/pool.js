const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'sqlyoguser',
  password: 'password',
  // database: 'indovoters_dev',
  database: 'dbtesting',
  debug: false,
});

module.exports = pool.promise();
