import { Router } from "express";
import { initChat } from "../controller/chat";
import {
  createGropuChat,
  makeGroupAdmin,
  removeGroupAdmin,
  removeUser,
  renameGroup,
} from "../controller/groupChat";

const router = Router();

router.post("/init", initChat);
router.post("/", createGropuChat);
router.put("/remove-user/:groupId", removeUser);
router.patch("/admin/:chatId", makeGroupAdmin);
router.patch("/remove-admin/:chatId", removeGroupAdmin);
router.patch("/:groupId", renameGroup);

export default router;
