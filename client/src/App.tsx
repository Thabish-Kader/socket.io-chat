import { useEffect, useState } from "react";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
	const [msg, setMsg] = useState("");
	const [messages, setMessages] = useState<string[]>([]);
	const [room, setRoom] = useState("");
	const sendMessage = () => {
		socket.emit("sendMsg", msg);
		setMsg("");
	};
	useEffect(() => {
		socket.on("getMsg", (data) => {
			setMessages([...messages!, data]);
		});
	}, [socket, messages]);

	const allocateRoom = () => {};

	return (
		<div className="main">
			<div>
				<div>
					<input
						type="text"
						value={msg}
						onChange={(e) => setMsg(e.target.value)}
					/>
					<button onClick={sendMessage}>Send Msg</button>
				</div>
				<div>
					<input
						type="text"
						value={room}
						onChange={(e) => setRoom(e.target.value)}
					/>
					<button onClick={allocateRoom}>Room</button>
				</div>

				<div>
					{messages.map((msg, i) => (
						<p key={i}>{msg}</p>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
