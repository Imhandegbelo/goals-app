const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
const User = require("../model/userModel");

// @getGoals Get goals
// @route GET /api/goals/
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @setGoals Add goals
// @route POST /api/goals/
// @access Private
const addGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide a text value");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @updateGoals Update a particular goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // commented because user already logged in
  // const user = await User.findById(req.user.id);

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User does not exits");
  }

  // Ensure logged in user matches ID of goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @deleteGoals Delete particular goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not authorised");
  }

  // check that goal user matches logged in user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  await goal.deleteOne({ id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  addGoals,
  updateGoal,
  deleteGoal,
};
