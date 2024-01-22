import { Request, Response } from "express";
import { chatModel } from "../model/chat";

async function userChat(req: Request, res: Response) {
  const { userId } = req.body;
  const loginUser = req.headers["x--user-id"];

  try {
    const isExist = await chatModel.find({ isGroupChat: false });

    return res.json({ success: true, message: "Requst successful" });
  } catch (error: any) {
    return res.json({ success: false, message: error.message });
  }
}
