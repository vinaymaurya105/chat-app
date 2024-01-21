import { Router } from "express";
import { login, registerUser } from "../controller/register";
import tokenValidator from "../middleware/tokenValidator";
import listusers from "../controller/user";

const router = Router();

router.get("/", tokenValidator, listusers);
router.post("/register", registerUser);
router.post("/login", login);

export default router;
