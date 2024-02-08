const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

// @desc Authenticates a user
// @route POST /api/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check that user exist
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Registers a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }

  // check if user exits
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //   check that user was created
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Error creating user");
  }
});

// @desc Get user data
// @route POST /api/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
  // commented out because we already handled it in the middleware
  // const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};
module.exports = { loginUser, getMe, registerUser };
