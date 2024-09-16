import { Document, Schema } from "mongoose";

export interface IBlog {
  title: string;
  desc: string;
  shortdesc: string;
}

export interface Icard {
  imageUrl: string;
  bankName: string;
  desc: string;
  redirectLink: string;
}

export interface ILoan {
  imageUrl: string;
  bankName: string;
  rating: number;
  loanAmount: string;
  maxTenure: string;
  bestRate: string;
  processingFee: string;
  redirectLink: string;
}
