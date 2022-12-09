import { Router, Response, Request } from "express";
import { isValidateEmail } from "../helpers";
import { UserModel } from "../models/user";
import { generateUrlService } from "../services/generateUrlService";
import { sendEmailResetPass } from "../services/sendEmailService";

interface TBodyForgot {
  email: string | undefined | null;
}
interface IResFrogot {
  message: string;
  url: string | null; 
  success: boolean;
}
type IReqForgot = Request<{}, {}, TBodyForgot>

type IResForgot = Response<IResFrogot>;

const genLinkPasswordRoute = Router();

genLinkPasswordRoute.post(
  "/generate-reset-password",
  async (req: IReqForgot, res: IResForgot) => {
    const { email } = req.body;
    if (!email) {
      return res.json({
        message: "Email is required",
        success: false,
        url: null,
      });
    }

    if (!isValidateEmail(email)) {
      return res.json({
        message: "Email is not valid",
        success: false,
        url: null,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "Email not found",
        success: false,
        url: null,
      });
    }

    const {url, success, message: msg } = await generateUrlService(user._id);

    if(!success || !url) {
      return res.json({
        message: msg,
        success: false,
        url: null
      })
    }

    try {
      await sendEmailResetPass(user.email, url, user.name);
      return res.json({
        message: `Link send to ${email}`,
        success: true,
        url: "ok",
      });
    } catch (error: any) {
      return res.json({
        message: error.message,
        success: false,
        url: null,
      });
    }
  }
);

export default genLinkPasswordRoute;
