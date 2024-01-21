import { Router } from "express";
import { login, registerUser } from "../controller/register";
import tokenValidator from "../middleware/tokenValidator";
import getUser from "../controller/user";

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);

router.use("/", tokenValidator);
router.get("/user", getUser);

export default router;
