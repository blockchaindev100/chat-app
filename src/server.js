import express from "express";
import router from "./router/index.js";
import bodyParser from "body-parser";
import { createServer } from "http"
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';
import cors from "cors"
import { socketService } from "./services/socket.js";

const app = express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')));
app.use(router)
socketService.initSocket(io);
server.listen(3000, () => {
    console.log("app listening at port 3000");
})