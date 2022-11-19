import { Router, Response, Request } from "express";
import { isExpired, isValidCode } from "../helpers";
import { fileModel } from "../models/file";

type TBody = {
  code: string;
  password: string;
}

type TypedResponse = {
  success: boolean;
  message: string;
  files: string[] | null;
}

const router = Router();

router.post("/searchFile", async (req: Request<{}, {}, TBody>, res: Response<TypedResponse>) => {
  const { code, password } = req.body;
  if (!code) {
    return res.status(404).json({
      success: false,
      message: "Code is required",
      files: null,
    });
  }

  if (!isValidCode(code))
    return res.status(404).json({
      success: false,
      message: "Code invalid",
      files: null,
    });

  const resFile = await fileModel.findOne({
    code,
  });

  if (resFile == null) {
    return res
      .status(404)
      .json({ success: false, message: "file not found", files: null });
  }

  if (isExpired(resFile.expiration)) {
    return res.status(498).json({
      files: null,
      message: "File(s) expired",
      success: false,
    });
  }

  if (resFile.protected) {
    if (!password) {
      return res.status(401).json({
        success: false,
        files: null,
        message: "File(s) protected, password is required!",
      });
    }

    const isValidPassword = resFile.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        files: null,
        message: "Password Invalid",
      });
    }
  }

  return res.json({
    success: true,
    message: "File(s) found",
    files: resFile.urls,
  });
});

export default router;
