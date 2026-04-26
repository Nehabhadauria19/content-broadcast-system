const pool = require("../config/db");

// APPROVE
exports.approveContent = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `UPDATE content 
     SET status='approved', approved_by=$1, approved_at=NOW()
     WHERE id=$2 RETURNING *`,
    [req.user.id, id]
  );

  res.json(result.rows[0]);
};

// REJECT
exports.rejectContent = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({ message: "Rejection reason required" });
  }

  const result = await pool.query(
    `UPDATE content 
     SET status='rejected', rejection_reason=$1 
     WHERE id=$2 RETURNING *`,
    [reason, id]
  );

  res.json(result.rows[0]);
};

// VIEW ALL CONTENT
exports.getAllContent = async (req, res) => {
  const result = await pool.query("SELECT * FROM content ORDER BY created_at DESC");
  res.json(result.rows);
};

// VIEW PENDING
exports.getPending = async (req, res) => {
  const result = await pool.query("SELECT * FROM content WHERE status='pending'");
  res.json(result.rows);
};