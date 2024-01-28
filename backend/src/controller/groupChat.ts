import { Request, Response } from "express";
import mongoose from "mongoose";
import { chatModel } from "../model/chat";
import { userModel } from "../model/user";

const ObjectId = mongoose.Types.ObjectId;
type ObjectId = mongoose.Types.ObjectId;

type UserType = {
  id: ObjectId;
  label: string;
  email: string;
  icon: string;
  admin?: boolean;
};

export async function createGropuChat(req: Request, res: Response) {
  const userId = req.headers["x-user-id"] as string;

  const { name, users } = req.body as { name: string; users: string[] };

  users?.push(userId);

  try {
    if (!name) throw new Error("name is required in body");
    if (!users || !Array.isArray(users) || users.length <= 0)
      throw new Error("Users should be array and contains atleast userId ");

    const newGroupChat = await chatModel.create({
      chatName: name,
      users,
      groupAdmin: [userId],
      isGroupChat: true,
      createdBy: userId,
    });

    const {
      _id,
      chatName,
      users: userIds,
      groupAdmin,
      isGroupChat,
      createdAt,
    } = newGroupChat;

    const groupUsers = await userModel.aggregate([
      { $match: { _id: { $in: userIds } } },
      { $set: { admin: { $in: ["$_id", groupAdmin] } } },
      {
        $project: {
          id: "$_id",
          _id: false,
          label: {
            $trim: {
              input: {
                $concat: [
                  { $ifNull: [`$firstName`, ""] },
                  " ",
                  { $ifNull: [`$lastName`, ""] },
                ],
              },
            },
          },
          email: true,
          icon: true,
          admin: true,
        },
      },
    ]);

    const createdBy = groupUsers?.find(
      (user: UserType) => user.id.toString() === userId.toString()
    ) as UserType;

    return res.json({
      success: true,
      message: "Group created succesfully",
      result: {
        id: _id,
        chatName,
        isGroupChat,
        users: groupUsers,
        createdBy,
        timestamp: createdAt,
      },
    });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
}
