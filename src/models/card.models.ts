import mongoose, { Schema } from "mongoose";
import { Icard } from "@/types/models.type";

const cardSchema: Schema<Icard> = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Image URl is required"],
  },
  bankName: {
    type: String,
    required: [true, "Bank Name is  Required "],
  },
  desc: {
    type: String,
    required: [true, "Description is Required "],
  },
  redirectLink: {
    type: String,
    required: [true, "Redirect Link is Required "],
  },
});

const cardModel =
  (mongoose.models.card as mongoose.Model<Icard>) ||
  mongoose.model<Icard>("card", cardSchema);

export default cardModel;
