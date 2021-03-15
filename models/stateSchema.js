import mongoose from "mongoose";

let Schema = mongoose.Schema;

const stateSchema = new Schema({
  state: {
    type: String,
    required: true,
    unique: true,
  },
});

const State = mongoose.model("State", stateSchema);
export default State;
