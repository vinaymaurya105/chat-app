import { Router } from "express";
import { initChat } from "../controller/chat";
import { createGropuChat, renameGroup } from "../controller/groupChat";

const router = Router();

router.post("/init", initChat);
router.post("/", createGropuChat);
router.patch("/:groupId", renameGroup);

export default router;
