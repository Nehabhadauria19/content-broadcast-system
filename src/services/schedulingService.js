const pool = require("../config/db");

// MAIN FUNCTION
const getActiveContent = async (teacherId) => {
  const now = new Date();

  // STEP 1: Get valid content
  const contents = await pool.query(
    `SELECT * FROM content 
     WHERE uploaded_by=$1 
     AND status='approved'
     AND start_time IS NOT NULL
     AND end_time IS NOT NULL
     AND $2 BETWEEN start_time AND end_time`,
    [teacherId, now],
  );

  if (!contents.rows.length) return null;

  // STEP 2: Get schedules ONLY for valid content
  const schedules = await pool.query(
    `SELECT cs.*, c.*
     FROM content_schedule cs
     JOIN content c ON cs.content_id = c.id
     WHERE c.uploaded_by=$1 
     AND c.status='approved'
     AND $2 BETWEEN c.start_time AND c.end_time
     ORDER BY cs.rotation_order ASC`,
    [teacherId, now],
  );

  if (!schedules.rows.length) {
    const c = contents.rows[0];

    return {
      id: c.id,
      title: c.title,
      subject: c.subject,
      file_url: c.file_path,
    };
  }
  // STEP 3: Rotation logic
  const totalDuration = schedules.rows.reduce(
    (sum, item) => sum + item.duration,
    0,
  );

  const currentTime = Math.floor(Date.now() / 1000);
  const cycleTime = currentTime % (totalDuration * 60);

  let cumulative = 0;

  for (let item of schedules.rows) {
    cumulative += item.duration * 60;

    if (cycleTime < cumulative) {
      return {
        id: item.content_id,
        title: item.title,
        subject: item.subject,
        file_url: item.file_path,
      };
    }
  }

  return null;
};

module.exports = { getActiveContent };
