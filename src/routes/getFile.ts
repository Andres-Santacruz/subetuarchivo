import { Router, Request, Response } from "express";
import { isValidCode } from "../helpers";
import { FileModel } from "../models/file";

interface IResGetFile {
  message: string;
  urls: string[] | null;
  success: boolean;
}

const router = Router();

router.post(
  "/getfile",
  async (
    req: Request<{}, {}, { code: string | undefined; password?: string }>,
    res: Response<IResGetFile>
  ) => {
    const { code, password } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ message: "code is required", success: false, urls: null });
    }

    if (!isValidCode(code)) {
      return res
        .status(400)
        .json({ message: "code is not valid", success: false, urls: null });
    }

    const infoCode = await FileModel.findOne({ code: code.toLowerCase() });

    if (!infoCode) {
      return res
        .json({ message: "files not found", success: false, urls: null });
    }

    const exp = infoCode.expiration.getTime();
    const now = Date.now();

    if (now > exp) {
      return res
        .json({ message: "file expired", success: false, urls: null });
    }

    if (infoCode.protected) {
      if (!password) {
        return res.json({
          message: "File protected, required password",
          success: false,
          urls: null,
        });
      }

      const isValid = infoCode.comparePassword(password);

      if (!isValid) {
        return res.json({
          message: "File protected, required password",
          success: false,
          urls: null,
        });
      }
    }

    console.log("infoCode", infoCode);

    return res.status(200).json({
      message: "find",
      success: true,
      urls: infoCode.urls,
    });
  }
);

export default router;
