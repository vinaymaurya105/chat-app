import { Router } from "express";
import tokenValidator from "../middleware/tokenValidator";
import UserRoutes from "./userRoutes";
import ChatRoutes from "./chat";

const router = Router();

router.use("/user", UserRoutes);

router.use("/", tokenValidator);

router.unsubscribe("/chat", ChatRoutes);

export default router;
