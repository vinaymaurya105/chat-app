import { Request, Response } from "express";
import { userModel } from "../model/user";

async function registerUser(req: Request, res: Response) {
  const { firstName, lastName, email, password, icon } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw Error("FirstName, lastname,email and password is required ");
  }

  const isUesrExist = await userModel.findOne({ email });
  if (isUesrExist) throw Error("User already exist with this email");

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    icon,
  });

  return res.json({
    success: true,
    result: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      icon: user.icon,
    },
  });
}

export default registerUser;
