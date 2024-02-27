import { Request, Response } from "express";
import { userModel } from "../model/user";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { isValidId } from "../../utils/helper";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

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
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  const { userName, password } = req.body;

  try {
    if (!userName || !password)
      throw new Error("userName and password is required");

    const user = await userModel.findOne(
      { email: userName.toLowerCase() }
      // { password: true, email: true }
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

    const firstName = user.firstName ? user.firstName : "";
    const lastName = user.lastName ? user.lastName : "";

    return res.json({
      success: true,
      message: "Login successful",
      result: {
        id: user.id,
        label: `${firstName}  ${lastName}`.trim(),
        subLabel: user.email,
        icon: user.icon,
        about: user?.about,
        token,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
}

export async function listusers(req: Request, res: Response) {
  const search = req.query.search as string;
  const userId = req.headers["x-user-id"] as string;
  try {
    const users = await userModel.aggregate([
      { $match: { _id: { $ne: new ObjectId(userId) } } },
      {
        $project: {
          id: "$_id",
          label: {
            $trim: {
              input: {
                $concat: [
                  { $ifNull: ["$firstName", ""] },
                  { $ifNull: ["$lastName", ""] },
                ],
              },
            },
          },
          subLabel: "$email",
          about: true,
          _id: false,
        },
      },
      {
        $match: {
          $or: [
            { label: RegExp(search || "", "i") },
            { email: RegExp(search || "", "i") },
          ],
        },
      },
    ]);
    return res.json({
      success: true,
      message: "Request successful",
      result: users,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: (error as Error).message || error,
    });
  }
}

export async function UpdateUser(req: Request, res: Response) {
  const userId = req.params.userId;
  const { about, label, icon } = req.body;

  try {
    isValidId(userId, "userId");

    if (!Object.keys(req.body).length) throw new Error("Body is required");

    if (about && typeof about !== "string")
      throw new Error("about should be string");
    if (label && typeof label !== "string")
      throw new Error("name should be string");

    let firstName;
    let lastName;

    if (label) {
      const names = label?.split(" ");
      firstName = names?.[0];
      lastName = names.slice(1).join(" ").trim();
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: { firstName, lastName, about, icon },
      },
      { new: true }
    );

    if (!user) throw new Error("UserId is not valid");

    const fName = user.firstName ? user.firstName : "";
    const lName = user.lastName ? user.lastName : "";

    return res.json({
      success: true,
      message: "User updated succesfully",
      result: {
        id: user?.id,
        label: `${fName} ${lName}`.trim(),
        sublabel: user.email,
        icon: user.icon,
        about: user.about,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
}

export async function LogoutUser(req: Request, res: Response) {
  return res.send({ success: true, message: "User logout sucessfully" });
}
