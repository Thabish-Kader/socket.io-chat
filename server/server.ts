import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { instrument } from "@socket.io/admin-ui";

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173", "https://admin.socket.io"],
		methods: ["GET", "POST"],
		credentials: true,
	},
});

instrument(io, {
	auth: false,
	mode: "development",
});

io.on("connection", (socket: Socket) => {
	socket.on("sendMsg", (data) => {
		console.log(data);
		if (data.room === "") {
			io.sockets.emit("getMsg", data.msg);
		} else {
			socket.join(data.room);
			io.to(data.room).emit("getMsg", data.msg);
		}
	});
});

server.listen(3000, () => {
	console.log(`Server running ${3000}`);
});
