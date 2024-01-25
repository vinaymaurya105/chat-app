import { Router } from "express";
import { initChat } from "../controller/chat";

const router = Router();

router.post("/init", initChat);

export default router;
