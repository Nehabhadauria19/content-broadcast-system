const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { addSchedule } = require("../controllers/contentController");
const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/schedule", protect, authorize("teacher"), addSchedule);

module.exports = router;