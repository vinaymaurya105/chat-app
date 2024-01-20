import { Request, Response } from "express";
import { userModel } from "../model/user";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  const { firstName, lastName, email, password, icon } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      throw Error("FirstName, lastname,email and password is required ");
    }

    const isUesrExist = await userModel.findOne({ email });
    if (isUesrExist) throw Error("User already exist with this email");

    const hashedPassword = await bcrypt.hash(password, 15);

    const user = await userModel.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
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
  } catch (error: any) {
    return res.json({ success: false, message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  const { userName, password } = req.body;

  try {
    if (!userName || !password)
      throw new Error("userName and password is required");

    const user = await userModel.findOne(
      { email: userName.toLowerCase() },
      { password: true, email: true }
    );

    if (!user) throw new Error("user does not exist");

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) throw Error("Invalid userName or password");

    const sessionId = crypto.randomBytes(10).toString("hex");

    const token = jwt.sign(
      { email: userName, sessionId },
      process.env.SECRET_KEY as string,
      { expiresIn: process.env.EXPIRE_TIME }
    );

    return res.json({ success: true, message: "Login successful", token });
  } catch (error: any) {
    return res.json({ success: false, message: error.message });
  }
}
