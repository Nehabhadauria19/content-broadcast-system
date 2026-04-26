const router = require("express").Router();
const { getLiveContent } = require("../controllers/publicController");

router.get("/live/:teacherId", getLiveContent);

module.exports = router;