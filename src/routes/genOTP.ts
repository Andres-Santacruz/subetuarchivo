import { Request, Router } from "express";
import { isValidateEmail } from "../helpers";
import { OtpInfoModel } from "../models/otpInfo";
import { sendEmail } from "../services/sendEmailService";

type TBody = {
  email: string;
};
const router = Router();

router.post("/genotp", async (req: Request<{}, {}, TBody>, res) => {
  const { email } = req.body;
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  if (!isValidateEmail(email)) {
    return res.status(400).json({
      succes: false,
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
      await sendEmail(email, otp);
      return res.status(202).json({
        succes: true,
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
    await sendEmail(email, otp);
    return res.status(201).json({
      otp,
      succes: true,
      info: "OTP generated and send: " + email,
    });
  } catch (err: any) {
    const error = new Error();
    error.message = "No se pudo crear otp: " + err.message;
    throw error;
  }
});

export default router;
