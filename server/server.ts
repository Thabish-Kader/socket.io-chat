import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
	console.log(socket.id);
});

app.listen(3000, () => {
	console.log(`Server running ${3000}`);
});
