const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'melody',
  database: 'university_db',
  connectionLimit: 5
});

module.exports = pool;
