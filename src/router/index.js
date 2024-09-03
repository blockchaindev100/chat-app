import { Router } from "express";
import user from "./user.js";
import profile from "./profile.js";

const router = Router();

router.use("/user", user);
router.use("/profile",profile)

export default router;
