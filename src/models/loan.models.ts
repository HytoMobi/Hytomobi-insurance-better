import mongoose, { Schema } from "mongoose";
import { ILoan } from "@/types/models.type";

const loanSchema: Schema<ILoan> = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Image URl is required"],
  },
  bankName: {
    type: String,
    required: [true, "Bank Name is  Required "],
  },
  rating: {
    type: Number,
    required: [true, "Rating is Required "],
  },
  loanAmount: {
    type: String,
    required: [true, "Loan amount is Required "],
  },
  maxTenure: {
    type: String,
    required: [true, "Max Tenure is Required "],
  },
  bestRate: {
    type: String,
    required: [true, "Best Rate is Required "],
  },
  processingFee: {
    type: String,
    required: [true, "Processing Fees is Required "],
  },
  redirectLink: {
    type: String,
    required: [true, "Redirect Link is Required "],
  },
});

const loanModel =
  (mongoose.models.loan as mongoose.Model<ILoan>) ||
  mongoose.model<ILoan>("loan", loanSchema);

export default loanModel;
