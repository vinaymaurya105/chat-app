import { Router } from "express";
import { registerUser } from "../controller/register";

const router = Router();

router.post("/register", registerUser);

export default router;
