import { Request, Response } from "express";
import { userModel } from "../model/user";
import bcrypt from "bcrypt";

export async function registerUser(req: Request, res: Response) {
  const { firstName, lastName, email, password, icon } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw Error("FirstName, lastname,email and password is required ");
  }

  const isUesrExist = await userModel.findOne({ email });
  if (isUesrExist) throw Error("User already exist with this email");

  const hashedPassword = await bcrypt.hash(password, 15);

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    icon,
  });

  return res.json({
    success: true,
    message: "User created successfully",
    result: {
      id: user._id,
    },
  });
}

export async function login(req: Request, res: Response) {
  return res.json({ success: true });
}
