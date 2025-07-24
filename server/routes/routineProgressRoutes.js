const express = require("express");
const router = express.Router();
const {
  updateRoutineProgress,
  getRoutineProgressByUser,
} = require("../controllers/routineProgressController");

router.post("/update", updateRoutineProgress);
router.get("/:userId", getRoutineProgressByUser);

module.exports = router;
