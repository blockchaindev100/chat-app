import { auth } from "../services/jwt.js";
import { user as userController } from "../services/user.js"

class User {
    async create(req, res) {
        try {
            const result = await userController.create(req.body);
            if (result.error) {
                throw new Error(result.error)
            }
            return res.status(200).json({ "message": result.message })
        }
        catch (err) {
            return res.status(500).json({ "message": "user creation failed" });
        }
    }

    async login(req, res) {
        try {
            const result = await userController.login(req.body);
            if (result.error) {
                throw new Error(result.message);
            }
            return res.status(200).json({
                "message": result.message,
                "token": result.token,
                "userid": result.userid
            })
        } catch (err) {
            console.log(err);
            return res.status(401).json({ "message": "Invalid user" })
        }
    }

    async getUsers(req, res) {
        try {
            const result = await userController.getUsers(req.user);
            if (result.error) {
                throw new Error(result.message);
            }
            return res.status(200).json({
                message: result.message,
                data: result.data
            })
        } catch (err) {
            return res.status(500).json(
                {
                    message:"Error retriving users"
                }
            )
        }
    }
}

export const user = new User()