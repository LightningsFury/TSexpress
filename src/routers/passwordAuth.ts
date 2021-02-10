import { Request, Response, Handler, NextFunction } from "express";
import crypto from "crypto";
import env from "../Env";

const passwordAuth: Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pass = req.body.password || "";
  const hash = crypto.createHash("sha256");
  hash.update(pass);
  const password = hash.copy().digest("hex");
  if (password !== env.password)
    return res.status(200).json({
      message: "invalid password",
    });
  next();
};

export default passwordAuth;
