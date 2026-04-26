const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "broadcast_system",
  password: "Neha@19",
  port: 5432,
});

module.exports = pool;
