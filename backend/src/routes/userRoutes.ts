import { Router } from "express";
import { listusers, login, registerUser } from "../controller/register";
import tokenValidator from "../middleware/tokenValidator";

const router = Router();

router.get("/", tokenValidator, listusers);
router.post("/register", registerUser);
router.post("/login", login);

export default router;
