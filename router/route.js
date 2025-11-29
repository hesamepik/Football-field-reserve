const express = require("express");
const router = express.Router();
const { getFields, getRezerv, getAvailability } = require("../controller/controller");

router.get("/get_football_pitch_info", getFields);
router.post("/rezerv", getRezerv);
router.post("/check-availability", getAvailability);

module.exports = router;
