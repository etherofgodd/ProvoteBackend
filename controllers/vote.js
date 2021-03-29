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

  // looks for the nin in the database
  const validNin = await Nin.findOne({ nin });

  if (!validNin) throw new Error("No Nin found");

  // looks fir the valid candidate
  const validCandidate = await PollOption.findById(req.body.id);

  if (!validCandidate) {
    res.status(404);
    throw new Error("Candidates not valid");
  }

  // looks for the valid voter Id
  const validVoter = await User.findOne({ voterId });

  if (!validVoter) {
    res.status(400);
    throw new Error("Bad voterId request");
  }

  // Checks to see if the voter is a registered user
  const validUser = await User.findById(user);

  if (!validUser) {
    res.status(400);
    throw new Error("Bad User Id");
  }

  // if the candidate exists
  if (validCandidate) {
    // Check for an existing vote
    const voteExists = await Vote.findOne({
      user: req.body.user,
      poll: req.params.poll_id,
    });

    // if the voting details exists then return an error cos the user has voted before
    if (voteExists) {
      res.status(400);
      throw new Error("User has voted before");
    } else {
      // else vote the candidate with the user's details
      const vote = new Vote({
        user: req.body.user,
        pollOption: validCandidate._id,
        poll: req.params.poll_id,
      });

      // async vote to save
      const validVote = await vote.save();

      if (!validVote) throw new Error("Could not save vote");

      if (validVote) {
        // if the vote is saved then check the
        //  candidate voted for and add the user id to it
        validCandidate.votes.push(vote);

        // save the valid candidate too
        const savedVoteCount = await validCandidate.save();

        if (!savedVoteCount) throw new Error("Could not save the updated vote");

        if (savedVoteCount) {
          // if the vote is saved then check the poll count and then update the count ++
          const updatedPollCount = await Poll.findByIdAndUpdate(
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
            }
          );

          if (updatedPollCount) {
            res.status(200);
            res.json({
              type: "Vote++",
              candidate: savedVoteCount.value,
              message: "Poll Count Updated",
            });
          } else {
            res.status(400);
            throw new Error("Can't Update poll Count");
          }
        }
      }
    }
  }
});

export { vote };
