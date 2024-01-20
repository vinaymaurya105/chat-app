import { Router } from "express";
import { login, registerUser } from "../controller/register";
import tokenValidator from "../middleware/tokenValidator";

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);

router.use("/", tokenValidator);

export default router;
