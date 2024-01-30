import { Router } from "express";
import { initChat } from "../controller/chat";
import {
  createGropuChat,
  removeUser,
  renameGroup,
} from "../controller/groupChat";

const router = Router();

router.post("/init", initChat);
router.post("/", createGropuChat);
router.patch("/:groupId", renameGroup);
router.put("/remove-user/:groupId", removeUser);

export default router;
