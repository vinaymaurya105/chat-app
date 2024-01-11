import { Request, Response } from "express";
import { userModel } from "../model/user";
import bcrypt from "bcrypt";

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
      { email: userName },
      { password: true, email: true }
    );

    if (!user)
      return res.json({ success: false, message: "user does not exist" });

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) throw Error("Invalid userName or password");

    return res.json({ success: true, message: "Login successful" });
  } catch (error: any) {
    return res.json({ success: false, message: error.message });
  }
}
