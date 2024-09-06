import { auth } from "../services/jwt.js";

class Authentication {
    async userAuthenctication(req, res, next) {
        try {
            const authHeader = req.headers["authorization"];
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                const result = await auth.verifyToken(token);
                if (!result.error) {
                    req.user = result.payload.data;
                    next();
                } else {
                    return res.json({
                        "message": "Invalid Token"
                    })
                }
            } else {
                return res.status(401).json({
                    "message": "Token is not provided"
                })
            }
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                "message": "Error in authentication"
            })
        }
    }
}

export const authentication = new Authentication();