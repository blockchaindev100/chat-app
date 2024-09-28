import prismaClient from "../models/prismaClient.js"
class Chat {
    async getOrCreateRoom(req, res) {
        try {
            const { userid } = req.body;
            let room = await prismaClient.room.findFirst({
                where: {
                    isGroupChat: false,
                    participants: {
                        every: {
                            userId: { in: [req.user, userid] }
                        }
                    }
                },
                include: {
                    participants: true
                }
            });
            if (!room) {
                room = await prismaClient.room.create({
                    data: {
                        isGroupChat: false,
                        participants: {
                            create: [
                                { userId: req.user },
                                { userId: userid }
                            ],
                        }
                    },
                    include: {
                        participants: true,
                    }
                });
            }
            res.status(200).json(room);
        } catch (err) {
            res.status(500).json({ error: "Error creating or retrieving room" });
        }
    }

    async getAllMessagesByRommId(req, res) {
        const { roomId } = req.params;
        try {
            const message = await prismaClient.message.findMany({
                where: { roomId },
                orderBy: { createdAt: 'asc' },
                include: {
                    sender: {
                        select: { id: true, email: true },
                    }
                }
            });
            res.status(200).json(message);
        } catch (err) {
            res.status(500).json({ error: 'Error retrieving messages' });
        }
    }

    async getRooms(req, res) {
        const userId = req.user;
        try {
            const rooms = await prismaClient.room.findMany({
                where: {
                    participants: {
                        some: {
                            userId: userId,
                        }
                    },
                    isGroupChat: { equals: false },
                },
                include: {
                    participants: {
                        where: {
                            userId: {
                                not: userId,
                            }
                        },
                        select: {
                            user: {
                                select: {
                                    email: true,
                                    firstName: true,
                                    lastName: true,
                                    profile: true,
                                    id: true
                                }
                            }
                        }
                    },
                    messages: {
                        orderBy: { createdAt: "desc" },
                        take: 1
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            rooms.sort((a, b) => {
                const messageA = a.messages[0]?.createdAt || a.createdAt;
                const messageB = b.messages[0]?.createdAt || b.createdAt;
                return new Date(messageB) - new Date(messageA);
            });

            res.status(200).json(rooms);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Error retrieving rooms" });
        }
    }


    async getRoomById(req, res) {
        const roomId = req.params['id'];
        const userId = req.user
        try {
            const room = await prismaClient.room.findUnique({
                where: {
                    id: roomId
                },
                include: {
                    participants: {
                        where: {
                            userId: {
                                not: userId,
                            }
                        },
                        select: {
                            user: {
                                select: {
                                    email: true,
                                    firstName: true,
                                    lastName: true,
                                    profile: true,
                                    id: true
                                }
                            }
                        }
                    },
                    messages: {
                        orderBy: { createdAt: "desc" },
                        take: 1
                    }
                }
            });
            res.status(200).json({
                message: "Details Retrived Successfully",
                data: room
            })

        } catch (err) {
            res.status(500).json({
                message: "Error Retrived Details"
            })
        }
    }

}

export const chat = new Chat();