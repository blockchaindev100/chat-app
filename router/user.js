import { Router } from "express";
import {createUser} from "../handlers/user.js"
const user = Router()

user.get("/",createUser);
user.post("/");
user.put("/");
user.delete("/");

export default user