import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/getVariables";

interface RequestWithUserRole extends Request {
  user?: string | jwt.JwtPayload | null;
}
// middleware to validate token (rutas protegidas)
export const verifyToken = (
  req: RequestWithUserRole,
  _res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const verified = jwt.verify(token, TOKEN_SECRET);
    req.user = verified;
    next(); // continuamos
  } catch (error) {
    req.user = null;
    return next();
  }
};

