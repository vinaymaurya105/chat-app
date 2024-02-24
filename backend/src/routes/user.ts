import { Router } from "express";
import {
  LogoutUser,
  UpdateUser,
  listusers,
  login,
  registerUser,
} from "../controller/users";
import tokenValidator from "../middleware/tokenValidator";

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);

router.use("/", tokenValidator);

router.get("/", listusers);
router.post("/logout", LogoutUser);
router.patch("/:userId", UpdateUser);

export default router;
