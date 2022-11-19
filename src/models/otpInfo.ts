import { Schema, model } from "mongoose";

const otpInfoSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    otp: { type: String, require: true },
    used: {
      type: Boolean,
      default: false,
    },
    expiration: {
      type: Date,
      default: Date.now() + 60 * 5 * 1000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const otpInfoModel = model("otpInfo", otpInfoSchema);
