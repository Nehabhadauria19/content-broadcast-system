const { getActiveContent } = require("../services/schedulingService");

exports.getLiveContent = async (req, res) => {
  const { teacherId } = req.params;

  const content = await getActiveContent(teacherId);

  if (!content) {
    return res.json({ message: "No content available" });
  }

  res.json(content);
};