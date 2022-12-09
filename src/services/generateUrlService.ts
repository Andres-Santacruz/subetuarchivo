import crypto from "crypto";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { TokenResetPass } from "../models/tokenResetPassword";

interface IResGenLink {
  success: boolean;
  url: string | null;
  message: string;
}

export const generateUrlService = async (
  userId: Types.ObjectId
): Promise<IResGenLink> => {
  const token = await TokenResetPass.findOne({
    userId,
  });

  if (token) {
    await token.deleteOne();
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, 10);
  try {
    await new TokenResetPass({
      userId,
      token: hash,
      createdAt: Date.now(),
    }).save();
    return {
      url: `https://www.subetuarchivo.com/passwordReset/reset?token=${resetToken}&id=${userId}`,
      success: true,
      message: ""
    };
  } catch (error: any) {
    return {
      success: false,
      url: null,
      message: error.message,
    };
  }
};
