const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users(name,email,password_hash,role) VALUES($1,$2,$3,$4) RETURNING *",
    [name, email, hashed, role]
  );

  res.json(result.rows[0]);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  if (!user.rows.length) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.rows[0].password_hash);

  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const token = generateToken(user.rows[0]);

  res.json({ token });
};