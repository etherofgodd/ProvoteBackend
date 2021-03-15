import expressAsyncHandler from "express-async-handler";
import Nin from "../models/ninSchema.js";
import State from "../models/stateSchema.js";

// @desc create NIN details
// @route POST /api/user/NIN
// @access Private
const inputNin = expressAsyncHandler(async (req, res) => {
  const {
    nin,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    state,
    dob,
  } = req.body;

  const ninExists = await Nin.findOne({ nin });
  const numberExists = await Nin.findOne({ phoneNumber });

  if (ninExists || numberExists) {
    res.status(400);
    throw new Error(
      "Cross Check credentials, Either the NIN or the Phone Number already exists in the system"
    );
  }

  const createdNin = await Nin.create({
    nin,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    state,
    dob,
  });

  if (createdNin) {
    res.status(201).json({
      _id: createdNin._id,
      nin: createdNin.nin,
      firstName: createdNin.firstName,
      middleName: createdNin.middleName,
      lastName: createdNin.lastName,
      phoneNumber: createdNin.phoneNumber,
      state: createdNin.state,
      dob: createdNin.dob,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Request");
  }
});

// @desc Get NIN details
// @route GET /api/user/NIN
// @access Private

const getNinDetails = expressAsyncHandler(async (req, res) => {
  const userDetails = await Nin.find({})
    .select("-_id -createdAt -updatedAt -__v")
    .populate("state", "state -_id");

  if (userDetails) {
    res.status(200).json(userDetails);
  } else {
    res.status(404);
    throw new Error("There's nothing Here");
  }
});

// @desc create state
// @route POST /api/NIN/state
// @access Private

const inputState = expressAsyncHandler(async (req, res) => {
  const { state } = req.body;

  const stateExists = await State.findOne({ state });

  if (stateExists) {
    res.status(400);
    throw new Error("State already exists");
  }

  const createdState = await State.create({
    state,
  });

  if (!state) {
    res.status(400);
    throw new Error("Invalid User Request");
  } else {
    res.status(201).json({
      _id: createdState._id,
      state: createdState.state,
    });
  }
});

// @desc Get NIN details
// @route GET /api/user/NIN
// @access Private

const getState = expressAsyncHandler(async (req, res) => {
  const state = await State.find({}).select("_id state");

  if (state) {
    res.status(200).json(state);
  } else {
    res.status(404);
    throw new Error("There's nothing Here");
  }
});

export { inputNin, getNinDetails, inputState, getState };
