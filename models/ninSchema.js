import mongoose from "mongoose";

let Schema = mongoose.Schema;

const ninSchema = new Schema(
  {
    nin: {
      type: Number,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    middleName: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },

    state: {
      type: Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Nin = mongoose.model("Nin", ninSchema);

export default Nin;
