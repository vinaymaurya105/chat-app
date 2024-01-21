import { Request, Response } from "express";
import { userModel } from "../model/user";

async function listusers(req: Request, res: Response) {
  const search = req.query.search as string;
  const userId = req.headers["x-user-id"];
  try {
    const searchquery = search
      ? {
          $or: [
            { label: RegExp(search || "", "i") },
            { email: RegExp(search || "", "i") },
          ],
        }
      : {};

    const users = await userModel.find(
      { _id: { $ne: userId }, ...searchquery },
      { password: false }
    );

    return res.json({
      success: true,
      message: "Request successful",
      result: users,
    });
  } catch (error: any) {
    return res.json({ success: false, message: error.message || error });
  }
}

export default listusers;
