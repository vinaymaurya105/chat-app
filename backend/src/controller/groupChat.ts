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
    if (!name) throw new Error("Name is required in body");
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

export async function renameGroup(req: Request, res: Response) {
  const groupId = req.params.groupId;
  const { name } = req.body;
  const userId = req.headers["x-user-id"] as string;

  try {
    if (!name || typeof name !== "string")
      throw new Error("Name is required and should be string");

    const updatedGroupChat = await chatModel.findByIdAndUpdate(
      groupId,
      {
        chatName: name,
      },
      { new: true }
    );
    if (!updatedGroupChat) throw new Error("GroupId is not valid");

    const {
      _id,
      chatName,
      users: userIds,
      groupAdmin,
      isGroupChat,
      createdAt,
    } = updatedGroupChat;

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
      (user: UserType) => user.id.toString() === userId
    ) as UserType;

    return res.json({
      success: true,
      message: "Updated successfully",
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

export async function removeUser(req: Request, res: Response) {
  const userId = req.headers["x-user-id"];
  const user = req.body.user;
  const { groupId } = req.params;

  try {
    if (!user) throw new Error("UserId is required in body");

    await chatModel.findByIdAndUpdate(groupId, {
      $pull: { users: user },
    });

    return res.json({ success: true, message: "User removed succesfully" });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
}

export async function makeGroupAdmin(req: Request, res: Response) {
  const userId = req.headers["x-user-id"];
  const chatId = req.params?.chatId;

  const user = req.body?.user;
  try {
    if (!user) throw new Error("userId is required");
    const newData = await chatModel.findByIdAndUpdate(chatId, {
      $push: { groupAdmin: user },
    });

    if (!newData) throw new Error("GroupId not valid");

    const {
      _id,
      chatName,
      users: userIds,
      groupAdmin,
      isGroupChat,
      createdAt,
    } = newData;

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
    res.json({
      success: true,
      message: "Admin created succesfully",
      result: {
        id: _id,
        chatName,
        isGroupChat,
        createdAt,
        users: groupUsers,
      },
    });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
}
