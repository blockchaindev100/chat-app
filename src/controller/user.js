import { auth } from "../services/jwt.js";
import { user as userController } from "../services/user.js"

class User {
    async create(req, res) {
        try {
            const result = await userController.create(req.body);
            if (result.error) {
                throw new Error(result.error)
            }
            return res.json({ "message": result.message })
        }
        catch (err) {
            console.log(err);
            return res.json({ "message": "user creation failed" });
        }
    }

    async login(req, res) {
        try {
            const result = await userController.login(req.body);
            if (result.err) {
                throw new Error(result.message);
            }
            const token = auth.generateToken(req.body);
            return res.json({
                "message": result.message,
                token
            })
        } catch (err) {
            return res.json({ "message": "Invalid user" })
        }
    }
}

export const user = new User()