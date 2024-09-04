class SocketService {
    initSocket(io) {
        io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('message', (msg) => {
                socket.broadcast.emit('message', msg);
            })
            socket.on('disconnect', () => {
                console.log('user disconnected', socket.id);
            });
        })
    }
}

export const socketService = new SocketService();