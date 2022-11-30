import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import {TOKEN_SECRET} from "../config/getVariables"
interface IProps {
  name: string;
  id: Types.ObjectId;
  email: string;
}

export const signToken = ({email, id, name}: IProps) => {
  const token = jwt.sign(
    {
      name,
      id,
      email,
    },
    TOKEN_SECRET
  );
  return token
}
