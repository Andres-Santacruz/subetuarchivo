import { Request, Router, Response } from "express";
import { isValidateEmail } from "../helpers";
import { OtpInfoModel } from "../models/otpInfo";
import { sendEmailOtp } from "../services/sendEmailService";

type TBody = {
  email: string;
};

interface IResGenOtp {
  message: string;
  success: boolean;
}

const router = Router();

router.post(
  "/genotp",
  async (req: Request<{}, {}, TBody>, res: Response<IResGenOtp>) => {
    const { email } = req.body;
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    if (!isValidateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: email ? "Email not valid" : "Email required",
      });
    }

    const emailExist = await OtpInfoModel.findOne({
      email,
    });

    if (emailExist) {
      try {
        await OtpInfoModel.findOneAndUpdate(
          {
            email,
          },
          {
            otp,
            used: false,
            expiration: Date.now() + 60 * 5 * 1000,
          }
        );
        await sendEmailOtp(email, otp);
        return res.status(202).json({
          success: true,
          message: "OTP generated, update and send to email " + email,
        });
      } catch (error: any) {
        console.log("error --> ", error.message);
      }
    }

    const infoModel = new OtpInfoModel({
      email,
      otp,
    });

    try {
      const infoRes = await infoModel.save();
      console.log("infoRes", infoRes);
      await sendEmailOtp(email, otp);
      return res.status(201).json({
        success: true,
        message: "OTP generated and send: " + email,
      });
    } catch (err: any) {
      const error = new Error();
      error.message = "No se pudo crear otp: " + err.message;
      throw error;
    }
  }
);

export default router;
