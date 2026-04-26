const pool = require("../config/db");

exports.uploadContent = async (req, res) => {
  const { title, subject, description, start_time, end_time } = req.body;

  if (!title || !subject) {
    return res.status(400).json({ message: "Title & subject required" });
  }

  const file = req.file;

  const result = await pool.query(
    `INSERT INTO content(title, description, subject, file_path, file_type, file_size, uploaded_by, start_time, end_time)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [
      title,
      description,
      subject,
      file.path,
      file.mimetype,
      file.size,
      req.user.id,
      start_time,
      end_time,
    ]
  );

  res.json(result.rows[0]);
};

exports.addSchedule = async (req, res) => {
  const { content_id, rotation_order, duration } = req.body;

  const result = await pool.query(
    `INSERT INTO content_schedule(content_id, rotation_order, duration)
     VALUES($1,$2,$3) RETURNING *`,
    [content_id, rotation_order, duration]
  );

  res.json(result.rows[0]);
};