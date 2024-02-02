import { Router } from "express";
import tokenValidator from "../middleware/tokenValidator";
import UserRoutes from "./user";
import ChatRoutes from "./chat";

const router = Router();

router.use("/user", UserRoutes);

router.use("/", tokenValidator);

router.use("/chat", ChatRoutes);

export default router;
