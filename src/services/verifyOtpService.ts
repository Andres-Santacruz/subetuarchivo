import { OtpInfoModel } from "../models/otpInfo";

interface IValidOtp {
  isValid: boolean;
  message: string;
}

export const verifyOtp = async (
  otp: string | undefined | null,
  email: string
): Promise<IValidOtp> => {
  if (!otp || otp.length !== 4) {
    return { isValid: false, message: "OTP is required" };
  }
  const otpInfo = await OtpInfoModel.findOne({ email });
  if (!otpInfo) return { isValid: false, message: "Email/OTP not found" };

  if (otp !== otpInfo.otp) {
    return { isValid: false, message: "OTP does not match" };
  }

  const dateOtp = otpInfo.expiration.getTime();
  const dateNow = Date.now();

  if (dateNow > dateOtp) {
    return { isValid: false, message: "OTP has expired" };
  }

  return { isValid: true, message: "" };
};
