import mongoose from "mongoose";
import PollOption from "./optionSchema.js";

let Schema = mongoose.Schema;

const PollSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    pollOptions: [PollOption.schema],

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    count: {
      type: Number,
      default: 0,
    },

    user: {
      type: String,
    },

    isElectionValid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model("Poll", PollSchema);

export default Poll;
