import { Request, Response } from "express";
import { chatModel } from "../model/chat";
import { userModel } from "../model/user";
import mongoose from "mongoose";
import { getUserFromHeader } from "../../utils/helper";

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

export async function listAllChat(req: Request, res: Response) {
  const userId = getUserFromHeader(req);

  try {
    const chats = await chatModel.aggregate([
      { $match: { users: new ObjectId(userId) } },
      {
        $lookup: {
          let: { groupAdmin: "$groupAdmin" },
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
          pipeline: [
            { $set: { admin: { $in: ["$_id", "$$groupAdmin"] } } },
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
          ],
        },
      },

      {
        $lookup: {
          from: "message",
          localField: "latestMessage",
          foreignField: "_id",
          as: "latestMessage",
        },
      },
      {
        $project: {
          id: "$_id",
          _id: false,
          chatName: true,
          isGroupChat: true,
          users: true,
          timeStamp: "$createdAt",
          latestMessage: { $arrayElemAt: ["$latestMessage", 0] },
        },
      },
    ]);

    res.json({ success: true, message: "Request succesful", result: chats });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
}
