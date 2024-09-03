import prisma from "../models/prismaClient.js";
import encryption from "../utils/encryption.js";
import { auth } from "./jwt.js";

class User {

    async create(userDetails) {
        try {
            if (userDetails.firstName.trim() === "" || userDetails.lastName.trim() === "" || userDetails.email.trim() === "" || userDetails.password.trim() === "") {
                throw new Error("Invalid Payload");
            }
            userDetails.password = await encryption.encryptPassword(userDetails.password);
            await prisma.userDetails.create({
                data: userDetails
            })
            return {
                message: "User created successfully",
                error: null
            }
        } catch (err) {
            return {
                message: "Error creating user",
                error: err
            }
        }
    }

    async login(loginDetails) {
        try {
            if (loginDetails.email.trim() === "" || loginDetails.password.trim() === "") {
                throw new Error("Invalid Payload");
            }
            const user = await prisma.userDetails.findUnique({
                where: {
                    email: loginDetails.email,
                },
            })
            auth.generateToken()
            const isMatch = encryption.comparePassword(loginDetails.password, user.password);
            if (isMatch) {
                return {
                    message: "Valid User",
                    error: null
                }
            } else {
                return {
                    message: "Credential Mismatch",
                    error: new Error("Credential Mismatch")
                }
            }
        } catch (err) {
            return {
                message: "Error Loging User",
                error: err
            }
        }
    }

}

export const user = new User();