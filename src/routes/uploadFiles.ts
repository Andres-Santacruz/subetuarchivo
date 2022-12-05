import { Router, Response, Request } from "express";
import type {} from "express-fileupload";
import { verifyToken } from "../middlewares/authMiddleware";
import jwt from "jsonwebtoken";
import { isValidSizes } from "../helpers";
import { uploadFiles } from "../services/uploadFilesServices";
import { isValidateEmail } from "../helpers";
import { verifyOtp } from "../services/verifyOtpService";
import { FileModel } from "../models/file";
import { validateCode } from "../services/validateCodeService";
// import {fileModel} from "../models/file";

interface IUploadRes {
  message: string;
  success: boolean;
  info: any;
}
interface IBody {
  otpVerify: string;
  email: string;
  password: string;
  time: number;
}
interface UserIDJwtPayload extends jwt.JwtPayload {
  email: string;
}
interface Ireq extends Request {
  user?: UserIDJwtPayload | null;
}

const router = Router();
/*
remove files
validar otp si no tiene sesion, 
validar si tiene sesion, 
validar password, 
validar tamaño del archivo
generar codigo y verificar q no exista
*/
router.post(
  "/upload",
  verifyToken,
  async (req: Ireq, res: Response<IUploadRes>) => {
    const { files, user } = req;
    if (!files){
      return res.json({
        info: null,
        message: "File is required",
        success: false,
      });}
    const { email, otpVerify, password, time } = req.body as IBody;
    let emailToUse = email;
    
    console.log('files', files)

    const {isValidSize, messageValidSize} = isValidSizes(files, Boolean(user));

    if(!isValidSize){
      return res.json({
        info: "",
        message: messageValidSize,
        success: false
      })
    }

    if (!user) {
      if (!isValidateEmail(email)) {
        return res
          .json({ success: false, message: "Email invalid", info: null });
      }

      const { isValid, message } = await verifyOtp(otpVerify, email);

      if (!isValid) {
        return res.json({
          info: null,
          message,
          success: false,
        });
      }
    } else {
      emailToUse = user.email;
    }
    const urls = await uploadFiles(files);
    if (urls.length === 0)
      return res.status(500).json({
        success: false,
        message: "Files cannot save",
        info: null,
      });

    const code = await validateCode();

    const file = new FileModel({
      expiration: time ? new Date(Date.now() + time) : undefined,
      protected: password ? true : false,
      urls: urls.map(el=>el.url),
      code,
      email: emailToUse,
      password,
      public_id: urls.map(el=>el.public_id)
    });

    try {
      await file.save();
      return res.json({ info: code, message: "Files upload successfuly", success: true });
    } catch (error: any) {
      return res
        .status(500)
        .json({ info: null, message: error.message, success: false });
    }
  }
);

export default router;
