import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket: Socket) => {
	socket.on("sendMsg", (data) => {
		socket.emit("getMsg", data);
	});
});

server.listen(3000, () => {
	console.log(`Server running ${3000}`);
});
