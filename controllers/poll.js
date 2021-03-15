import expressAsyncHandler from "express-async-handler";
import PollOption from "../models/optionSchema.js";
import Poll from "../models/pollSchema.js";

// @desc Create Poll
// @route POST /api/POLL
// @access private

const createPoll = (req, res) => {
  const title = req.body.title;
  const category = req.body.category;
  const isElectionValid = req.body.isElectionValid;

  const poll = new Poll({
    title,
    category,
    user: "ADMIN",
    isElectionValid,
  });
  let options = req.body.pollOptions;
  options = options.map((option) => {
    option.poll = poll._id;
    return option;
  });

  PollOption.create(options, (err, newOptions) => {
    if (err)
      return res.json({
        error: err,
      });
    poll.pollOptions.push(...newOptions);
    poll.save((err, newPoll) => {
      if (err) return res.send(err);
      return res.status(201).json(newPoll);
    });
  });
};

const getPolls = (req, res) => {
  Poll.findById(req.params.poll_id)
    .populate("category")
    .exec((err, poll) => {
      if (err) return res.send(err);
      return res.json(poll);
    });
};

const getAllPolls = expressAsyncHandler(async (req, res) => {
  const polls = await Poll.find({}).populate("category");
  if (polls) {
    res.status(200).json(polls);
  } else {
    res.status(404);
    throw new Error("Can't perform ops");
  }
});

const getPollsForCategory = (req, res) => {
  Poll.find({ category: req.params.category_id })
    .populate("category")
    .exec((err, polls) => {
      if (err) return res.json(err);
      return res.json(polls);
    });
};

const getPollOptionsForPoll = (req, res) => {
  PollOption.find(
    {
      poll: req.params.poll_id,
    },
    (err, options) => {
      if (err) return res.send(err);
      return res.json(options);
    }
  );
};
export {
  createPoll,
  getAllPolls,
  getPolls,
  getPollsForCategory,
  getPollOptionsForPoll,
};
