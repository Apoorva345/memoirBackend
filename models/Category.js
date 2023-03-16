import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique : true
    },
    count: {
      type: Number,
      required:false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);