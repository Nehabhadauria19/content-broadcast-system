const router = require("express").Router();
const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload");

const { uploadContent,addSchedule } = require("../controllers/contentController");

router.post(
  "/upload",
  protect,
  authorize("teacher"),
  upload.single("file"),
  uploadContent
);
router.post("/schedule", protect, authorize("teacher"), addSchedule);

module.exports = router;