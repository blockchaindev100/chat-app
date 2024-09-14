import prisma from "../models/prismaClient.js";

class SocketService {
    initSocket(io) {
        io.on('connection', (socket) => {
            console.log('A user is connected:', socket.id);

            socket.on('joinRoom', (roomId) => {
                console.log(`${socket.id} is joining room ${roomId}`);
                socket.join(roomId);
            });

            socket.on('sendMessage', async ({ roomId, senderId, content }) => {
                console.log(`Received message from ${senderId} in room ${roomId}:`, content);

                try {
                    const message = await prisma.message.create({
                        data: {
                            content,
                            senderId,
                            roomId
                        }
                    });

                    console.log('Message saved to database:', message);

                    io.to(roomId).emit('newMessage', message);

                    socket.broadcast.emit('newRoomMessage', { roomId, message });
                } catch (error) {
                    console.error('Error saving message:', error);
                }
            });

            socket.on('disconnect', () => {
                console.log(`User ${socket.id} disconnected`);
            });
        });
    }
}

export const socketService = new SocketService();
