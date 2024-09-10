import { Router } from "express";
import { user } from "../controller/user.js"
import { authentication } from "../middleware/authentication.js";

const route = Router()

route.post("/signup", user.create);
route.post("/login", user.login);
route.get("/users", authentication.userAuthenctication,user.getUsers);

export default route