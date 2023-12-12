const express = require("express");
const router = express.Router();
const {
  getGoals,
  addGoals,
  deleteGoal,
  updateGoal,
} = require("../controller/goalController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getGoals);
router.post("/", protect, addGoals);

// the line below save us a line of code and does same thing
// with the two lines above
// router.route("/").get(getGoals).post(addGoals)

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);

module.exports = router;
