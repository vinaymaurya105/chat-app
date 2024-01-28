import { Router } from "express";
import { initChat } from "../controller/chat";
import { createGropuChat } from "../controller/groupChat";

const router = Router();

router.post("/init", initChat);
router.post("/", createGropuChat);

export default router;
