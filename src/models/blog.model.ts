import mongoose, { Schema } from "mongoose";
import { IBlog } from "@/types/models.type";

const blogSchema: Schema<IBlog> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  desc: {
    type: String,
    required: [true, "desc is  Required "],
  },
  shortdesc: {
    type: String,
    required: [true, "Shortdesc is Required "],
  },
});

const blogModel =
  (mongoose.models.blog as mongoose.Model<IBlog>) ||
  mongoose.model<IBlog>("blog", blogSchema);

export default blogModel;
