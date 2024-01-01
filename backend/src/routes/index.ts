import { Router } from "express";
import RegisterUser from "../controller/register";

const router = Router();

router.post("/register", RegisterUser);

export default router;
