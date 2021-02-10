import { Request, Response, Handler, NextFunction } from "express";
import crypto from "crypto";

const passwordAuth: Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pass = req.body.password || "";
  const hash = crypto.createHash("sha256");
  hash.update(pass);
  console.log(hash.copy().digest("hex"));
  next();
};

export default passwordAuth;
