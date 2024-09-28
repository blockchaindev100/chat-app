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
                    message: "Error retriving users"
                }
            )
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params['id'];
            const userDetails = await userController.getUserById(id);
            return res.status(200).json({
                message: userDetails.message,
                data: userDetails.data
            })
        } catch (err) {
            return res.status(500).json({
                message: "Error retriving data"
            })
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params["id"];
            const user = req.body;
            const result = await userController.updateUser(user, userId);
            if (!result.error) {
                res.status(200).json(result.message);
            } else {
                res.status(500).json(result.message);
            }
        } catch (err) {
            res.status(500).json({ "message": "Error updating user" })
        }
    }

    async searchUser(req, res) {
        const { query } = req.query;
        console.log("query",query);
        try {
            const result = await userController.searchUsers(query);
            if (!result.error) {
                res.status(200).json(result);
            } else {
                throw new Error(result.error);
            }
        } catch (err) {
            res.status(500).json({
                message: "error retriving users"
            })
        }

    }
}

export const user = new User()