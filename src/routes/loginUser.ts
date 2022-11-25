import { compareSync } from "bcryptjs";
import { Router, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/getVariables";

import { validateLogin } from "../helpers/validatesUser";
import { UserModel } from "../models/user";

interface IResLogin {
  message: string;
  token: string | null;
  success: boolean;
}

interface TBodyLogin {
  email: string | undefined | null;
  password: string | undefined | null;
}

const router = Router();

router.post("/login", async (req:Request<{}, {}, TBodyLogin>, res: Response<IResLogin>) => {
  const { error } = validateLogin(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, token: null, success: false });
  }

  const {email, password} = req.body

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "contraseña/correo no válido",
      success: false,
      token: null,
    });
  }

  const validPassword = compareSync((password as string), user.password);

  if (!validPassword) {
    return res.status(400).json({
      message: "contraseña/correo no válido",
      success: false,
      token: null,
    });
  }
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
      email
    },
    TOKEN_SECRET
  );

  return res.status(200).json({
    message: "loged successfuly",
    token,
    success: true
  })
});
