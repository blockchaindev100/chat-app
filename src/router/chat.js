import { Router } from "express";
import { authentication } from "../middleware/authentication.js";
import { chat } from "../controller/chat.js";

const router = new Router()

router.post("/room", authentication.userAuthenctication, chat.getOrCreateRoom);
router.get("/room/:roomId/message", authentication.userAuthenctication, chat.getAllMessagesByRommId)
router.get("/room", authentication.userAuthenctication, chat.getRooms)
router.get("/room/:id", authentication.userAuthenctication, chat.getRoomById)

export default router