import { Router, Response, Request } from "express";
import bcrypt, { genSaltSync, hashSync } from "bcryptjs";
import { TokenResetPass } from "../models/tokenResetPassword";
import { UserModel } from "../models/user";

interface TBodyReset {
  token: string;
  userId: string;
  password: string;
}
interface IResReset {
  message: string;
  success: boolean;
}
type IReqReset = Request<{}, {}, TBodyReset>;

type IResponseReset = Response<IResReset>;

const resetPasswordRoute = Router();

resetPasswordRoute.post(
  "/reset",
  async (req: IReqReset, res: IResponseReset) => {
    const { password, token, userId } = req.body;

    if (!password || password.length < 4) {
      res.json({
        message: "Password Invalid",
        success: false,
      });
    }

    const passwordResetToken = await TokenResetPass.findOne({ userId });

    if (!passwordResetToken) {
      return res.json({
        message: "Not found token",
        success: false,
      });
    }

    const oneDay= 60*60*24*1000;
    const dateNow = Date.now();
    const dateToken = passwordResetToken.createdAt.getTime() + oneDay;

    if(dateNow > dateToken){
      await passwordResetToken.deleteOne();
      return res.json({
        message: "Token expired",
        success: false,
      });
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      return res.json({
        message: "Invalid reset token",
        success: false,
      });
    }

    const salt = genSaltSync(10);
    const passwordNew = hashSync(password, salt);

    try {
      await UserModel.updateOne(
        { _id: userId },
        { $set: { password: passwordNew } },
        { new: true }
      );

      await passwordResetToken.deleteOne();

      return res.json({
        message: "Password update successfuly",
        success: true,
      });
    } catch (error: any) {
      return res.json({
        message: error.message,
        success: false,
      });
    }
  }
);

export default resetPasswordRoute;
