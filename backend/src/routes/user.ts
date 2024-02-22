import { Router } from "express";
import {
  LogoutUser,
  listusers,
  login,
  registerUser,
} from "../controller/users";
import tokenValidator from "../middleware/tokenValidator";

const router = Router();

router.get("/", tokenValidator, listusers);
router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", tokenValidator, LogoutUser);

export default router;
