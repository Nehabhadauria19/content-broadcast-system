const router = require("express").Router();
const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {
  approveContent,
  rejectContent,
  getAllContent,
  getPending,
} = require("../controllers/approvalController");

router.get("/all", protect, authorize("principal"), getAllContent);
router.get("/pending", protect, authorize("principal"), getPending);

router.put("/approve/:id", protect, authorize("principal"), approveContent);
router.put("/reject/:id", protect, authorize("principal"), rejectContent);

module.exports = router;