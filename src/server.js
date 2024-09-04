import express from "express";
import router from "./router/index.js";
import bodyParser from "body-parser";
import { createServer } from "http"
import { Server } from "socket.io";
import cors from "cors"
import { socketService } from "./services/socket.js";

const app = express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ['GET', 'POST']
    }
});

app.use(cors())
app.use(bodyParser.json())
app.use(router)
socketService.initSocket(io);

server.listen(3000, () => {
    console.log("app listening at port 3000");
})