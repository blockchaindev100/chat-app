import prisma from "../models/prismaClient.js";
import encryption from "../utils/encryption.js";
import { auth } from "./jwt.js";

class User {

    async create(userDetails) {
        try {
            if (userDetails.firstName.trim() === "" || userDetails.lastName.trim() === "" || userDetails.email.trim() === "" || userDetails.password.trim() === "") {
                throw new Error("Invalid Payload");
            }
            if (!userDetails.profile) {
                userDetails.profile = "default.png"
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
                select: {
                    email: true,
                    firstName: true,
                    lastName: true,
                    profile: true,
                    password: true,
                    id: true
                }
            })
            const token = auth.generateToken(user.id)
            const isMatch = await encryption.comparePassword(loginDetails.password, user.password);
            if (isMatch) {
                return {
                    message: "Valid User",
                    token,
                    userid: user.id
                }
            } else {
                return {
                    message: "Credential Mismatch",
                    error: new Error("Credential Mismatch")
                }
            }
        } catch (err) {
            console.log(err);
            return {
                message: "Error Loging User",
                error: err
            }
        }
    }

    async getUsers(userId) {
        try {
            const users = await prisma.userDetails.findMany({
                where: {
                    id:{
                        not:userId
                    }
                },
                select: {
                    email: true,
                    id: true,
                    firstName: true,
                    lastName: true,
                    profile:true
                }
            })
            return {
                message: "users retrived successfully",
                data: users,
                error: null
            }
        } catch (err) {
            console.log(err);
            return {
                message: "Error retriving user",
                error: err
            }
        }
    }

}

export const user = new User();