import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  alias: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  num: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
