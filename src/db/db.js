const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'manejodb-manejodb.e.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_IhA5Mm_jN9pq0lKZtfG',
  database: 'defaultdb',
  port: 22932,
  ssl: { rejectUnauthorized: true } // conexão segura com Aiven
});

module.exports = pool;