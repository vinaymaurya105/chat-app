import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../model/user";
import { decode } from "punycode";

async function tokenValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) throw Error("Access token is required");

    const token = authToken.split(" ")[1];

    const decoded = jwt.decode(token) as jwt.JwtPayload;

    if (!decoded.email) throw new Error("Invalide token");

    const user = await userModel.findOne(
      { email: decoded.email.toLowerCase() },
      { _id: true }
    );
    if (!user) throw new Error("User not found");

    req.headers["x-user-id"] = user._id.toString();

    next();
  } catch (err: any) {
    return res.send({ success: false, message: err.message || err });
  }
}

export default tokenValidator;
