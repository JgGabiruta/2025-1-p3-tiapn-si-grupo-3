// backend/db.js
const mysql = require('mysql2/promise');

// ----- INÍCIO DO NOSSO TESTE DE DEBUG -----
console.log("--- DEBUGANDO VARIÁVEIS DE AMBIENTE ---");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD existe?", !!process.env.DB_PASSWORD); // Apenas para confirmar que a senha não é nula
console.log("--------------------------------------");
// ----- FIM DO NOSSO TESTE DE DEBUG -----


const pool = mysql.createPool({
  host: "manejodb-manejodb.e.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_IhA5Mm_jN9pq0lKZtfG",
  database: "defaultdb",
  port: 22932,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;