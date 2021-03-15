import expressAsyncHandler from "express-async-handler";
import Nin from "../models/ninSchema.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const generateVoterID = () => {
  // generates voter id with random func from Math
  const number = Math.random(10).toString().split(".")[1];
  return number;
};

// @desc Register a new User
// @route GET /api/users
// @access Public

const registerUser = expressAsyncHandler(async (req, res) => {
  const {
    nin,
    firstName,
    lastName,
    middleName,
    phoneNumber,
    state,
    dob,
    password,
    isAdmin,
  } = req.body;

  const validCredentials = await Nin.findOne({ nin });

  const userExists = await User.findOne({
    nin,
  });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  } else if (!validCredentials) {
    res.status(400);
    throw new Error("No NIN or Phone Number found for this candidate");
  } else {
    const user = await User.create({
      nin,
      firstName,
      lastName,
      middleName,
      state,
      phoneNumber,
      dob,
      password,
      isAdmin,
      voterId: +generateVoterID(),
    });

    if (user) {
      res.status(201).json({
        voterId: user.voterId,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user Request");
    }
  }
});

// @desc Get cuurent user details with NIN
// @route Post /api/users/profile
// @access Public

const getUserDetailsbyNin = expressAsyncHandler(async (req, res) => {
  const { nin } = req.body;
  const currentUser = await Nin.findOne({ nin }).populate("state");

  if (!currentUser) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.status(200).json({
      currentUser,
    });
  }
});

// @desc Get user Profile
// @route GET /api/user/profile
// @access Private

const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("state", "state")
    .select("-password -__v");

  if (user) {
    res.status(200);
    res.json({
      user,
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
});

// @desc LOGIN  User
// @route POST /api/users/login
// @access Public

const authUser = expressAsyncHandler(async (req, res) => {
  const { nin, password } = req.body;

  const user = await User.findOne({ nin });

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid NIN or Password");
  }
});

// @desc Get all Users
// @route GET /api/user
// @access Private Admin

const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc DELETE  Users
// @route DELETE /api/user/:id
// @access Private Admin

const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json({
      message: "User deleted from Database",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get User By Id
// @route GET /api/user/:id
// @access Private Admin

const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  deleteUser,
  getUserById,
  getUserDetailsbyNin,
  getUserProfile,
  getUsers,
  registerUser,
};
