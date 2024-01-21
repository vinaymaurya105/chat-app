import { Router } from "express";
import tokenValidator from "../middleware/tokenValidator";
import UserRoutes from "./userRoutes";

const router = Router();

router.use("/user", UserRoutes);

router.use("/", tokenValidator);

export default router;
