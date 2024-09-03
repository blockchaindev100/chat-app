import jwt from "jsonwebtoken";

class Jwt {
    generateToken(payload) {
        const secretKey = process.env.SECRET_KEY
        const options = {
            expiresIn: '1h',
        };
        const token = jwt.sign(payload, secretKey, options);
        return token;
    }

    verifyToken(token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if (err) {
                return {
                    message: "Token is not valid",
                    error: new Error("Token is not valid")
                }
            } else {
                return {
                    payload,
                    error: null
                }
            }
        })
    }
}

export const auth = new Jwt();