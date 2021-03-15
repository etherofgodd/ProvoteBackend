import expressAsyncHandler from "express-async-handler";
import Nin from "../models/ninSchema.js";
import PollOption from "../models/optionSchema.js";
import Poll from "../models/pollSchema.js";
import User from "../models/userModel.js";
import Vote from "../models/voteSchema.js";

const vote = expressAsyncHandler(async (req, res) => {
  const voterId = req.body.voterId;
  const user = req.body.user;
  const nin = req.body.nin;

  const validNin = await Nin.findOne({ nin });

  if (!validNin) throw new Error("No Nin found");

  const validCandidate = await PollOption.findById(req.body.id);

  if (!validCandidate) {
    res.status(404);
    throw new Error("Candidates not valid");
  }

  const validVoter = await User.findOne({ voterId });

  if (!validVoter) {
    res.status(400);
    throw new Error("Bad voterId request");
  }

  const validUser = await User.findById(user);

  if (!validUser) {
    res.status(400);
    throw new Error("Bad User Id");
  }

  if (validCandidate) {
    const voteExists = await Vote.findOne({
      user: req.body.user,
      poll: req.params.poll_id,
    });

    if (voteExists) {
      res.status(400);
      throw new Error("User has voted before");
    } else {
      const vote = new Vote({
        user: req.body.user,
        pollOption: validCandidate._id,
        poll: req.params.poll_id,
      });

      const validVote = await vote.save();
      if (!validVote) throw new Error("Could not save vote");
      if (validVote) {
        validCandidate.votes.push(vote);
        const savedVoteCount = await validCandidate.save();
        if (!savedVoteCount)
          throw new Error("Could not save the  updated vote");
        if (savedVoteCount) {
          res.status(200);
          res.json({
            type: "Vote++",
            candidate: savedVoteCount.value,
          });
        }
      }
    }
  }

  // PollOption.findById(req.body.id, async (err, option) => {

  //   Vote.findOne(
  //     {
  //       user: req.body.user,
  //       poll: req.params.poll_id,
  //     },
  //     (err, v) => {
  //       if (v)
  //         return res.status(400).json({
  //           type: "reduce",
  //           pollOption: option.value,
  //           message:
  //             "See your big head ! BASTARD have you not voted before, ode oshi",
  //         });

  //       const vote = new Vote({
  //         user: req.body.user,
  //         pollOption: option._id,
  //         poll: req.params.poll_id,
  //       });

  //       vote.save((err, newVote) => {
  //         if (err) throw new Error("Unable to save");
  //         option.votes.push(newVote);
  //         option.save((err, newOption) => {
  //           if (err) return res.send(err);
  //           return res.status(200).json({
  //             type: "increase",
  //             pollOption: newOption.value,
  //           });
  //         });
  //       });
  //       if (err) throw new Error(err);
  //     }
  //   );
  // });
});

const updatePollCount = (req, res) => {
  Poll.findOneAndUpdate(
    {
      _id: req.params.poll_id,
    },
    {
      $inc: {
        count: 1,
      },
    },
    {
      new: true,
    },
    (err, poll) => {
      if (err) return res.send(err);
      return res.json(poll);
    }
  );
};

export { vote, updatePollCount };
