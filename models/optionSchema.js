import mongoose from "mongoose";
import Vote from "./voteSchema.js";

let Schema = mongoose.Schema;

const PollOptionSchema = new Schema({
  poll: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },

  value: String,

  party: String,

  about: String,

  votes: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

PollOptionSchema.pre("remove", function (next) {
  Vote.remove({ pollOption: this._id });
  next();
});

const PollOption = mongoose.model("PollOption", PollOptionSchema);

export default PollOption;
