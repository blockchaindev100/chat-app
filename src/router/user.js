import { Router } from "express";
import { user } from "../controller/user.js"
import { authentication } from "../middleware/authentication.js";

const route = Router()

route.get("/users", authentication.userAuthenctication, user.getUsers);
route.get("/search", authentication.userAuthenctication, user.searchUser)
route.get("/:id", authentication.userAuthenctication, user.getUserById);
route.post("/signup", user.create);
route.post("/login", user.login);
route.put("/:id", authentication.userAuthenctication, user.updateUser)

export default route