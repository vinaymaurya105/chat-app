import { Request, Response } from "express";
import { chatModel } from "../model/chat";
import { userModel } from "../model/user";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export async function initChat(req: Request, res: Response) {
  const { userId } = req.body;
  const loginUser = req.headers["x-user-id"] as string;

  try {
    if (!userId) throw new Error("userId is reuired in body");

    let isChatExist = await chatModel.aggregate([
      {
        $match: {
          isGroupChat: false,
          users: { $all: [new ObjectId(loginUser), new ObjectId(userId)] },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
          pipeline: [
            {
              $project: {
                id: "$_id",
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
                _id: 0,
                email: 1,
                icon: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          id: "$_id",
          _id: 0,
          users: 1,
          chatName: 1,
          isGroupChat: 1,
          timestamp: "$createdAt",
        },
      },
    ]);

    if (isChatExist.length > 0) {
      return res.json({ success: true, result: isChatExist });
    }
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [loginUser, userId],
    };
    const newChat = await chatModel.create(chatData);

    const users = await userModel.find(
      { _id: { $in: [loginUser, userId] } },
      {
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
      }
    );

    return res.json({
      success: true,
      message: "Chat created successful",
      result: { ...newChat.toJSON(), users },
    });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
}
