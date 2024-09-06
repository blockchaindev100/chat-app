import { Router } from "express";
import user from "./user.js";
import profile from "./profile.js";
import chat from "./chat.js"
const router = Router();

router.use("/user", user);
router.use("/profile",profile)
router.use("/chat",chat)

export default router;
