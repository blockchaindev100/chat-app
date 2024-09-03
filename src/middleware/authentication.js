import { auth } from "../services/jwt";

class Authentication {
    userAuthenctication(req, res, next) {
        const authHeader = req.header.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const result = auth.verifyToken(token);
            if (!result.error) {
                next();
            } else {
                return res.json({
                    "message": "Invalid Token"
                })
            }
        } else {
            return res.json({
                "message": "Token is not provided"
            })
        }
    }
}

export const authentication = new Authentication();