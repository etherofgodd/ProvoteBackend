import mongoose from "mongoose";

const Schema = mongoose.Schema;

const voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  pollOption: {
    type: Schema.Types.ObjectId,
    ref: "PollOption",
    required: true,
  },
  poll: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
