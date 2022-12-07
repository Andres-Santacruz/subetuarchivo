import { Router, Response } from "express";
import { UserModel } from "../models/user";
import { hashSync, genSaltSync } from "bcryptjs";
import { validateRegister } from "../helpers/validatesUser";
import { signToken } from "../helpers/signToken";

interface IUser {
  token: string;
  name: string;
  email: string;
}

interface IResRegister {
  message: string;
  user: IUser | null;
  success: boolean;
}

const router = Router();

router.post("/register", async (req, res: Response<IResRegister>) => {
  // validate user
  const { error } = validateRegister(req.body);

  if (error) {
    return res
      .json({ message: error.details[0].message, user: null, success: false });
  }

  const isEmailExist = await UserModel.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res
      .json({ message: "Email ya registrado", user: null, success: false });
  }

  // hash contraseña
  const salt = genSaltSync(10);
  const password = hashSync(req.body.password, salt);

  const user = new UserModel({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: password,
  });
  try {
    const savedUser = await user.save();

    const token = signToken({
      email: savedUser.email,
      id: savedUser._id,
      name: savedUser.name + savedUser.surname,
    });

    return res.json({
      message: "user saved successfuly",
      user: {
        token,
        email: savedUser.email,
        name: user.name + user.surname,
      },
      success: true,
    });
  } catch (error: any) {
    return res
      .json({ message: error.message, success: false, user: null });
  }
});

export default router;
