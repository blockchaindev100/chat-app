import { Router } from "express";
import { user } from "../controller/user.js"

const route = Router()

route.post("/signup", user.create);
route.post("/login", user.login);

export default route