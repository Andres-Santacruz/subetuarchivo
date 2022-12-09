import { compareSync } from "bcryptjs";
import { Router, Response, Request } from "express";
import { signToken } from "../helpers/signToken";

import { validateLogin } from "../helpers/validatesUser";
import { UserModel } from "../models/user";

interface IUser {
  token: string;
  name: string;
  email: string;
}

interface IResLogin {
  message: string;
  user: IUser | null;
  success: boolean;
}

interface TBodyLogin {
  email: string | undefined | null;
  password: string | undefined | null;
}

const router = Router();

router.post(
  "/login",
  async (req: Request<{}, {}, TBodyLogin>, res: Response<IResLogin>) => {
    const { error } = validateLogin(req.body);

    if (error) {
      return res.json({
        message: error.details[0].message,
        user: null,
        success: false,
      });
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "contraseña/correo no válido",
        success: false,
        user: null,
      });
    }

    const validPassword = compareSync(password as string, user.password);

    if (!validPassword) {
      return res.json({
        message: "contraseña/correo no válido",
        success: false,
        user: null,
      });
    }

    const token = signToken({
      name: `${user.name} ${user.surname}`,
      id: user._id,
      email: email as string,
    });

    return res.status(200).json({
      message: "loged successfuly",
      user: {
        token,
        email: email as string,
        name: `${user.name} ${user.surname}`,
      },
      success: true,
    });
  }
);

export default router;
