import { useEffect, useState } from "react";
import * as io from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../typings";
const socket: io.Socket<ServerToClientEvents, ClientToServerEvents> =
	io.connect("http://localhost:3000");

function App() {
	const [msg, setMsg] = useState("");
	const [messages, setMessages] = useState<string[]>([]);
	const [room, setRoom] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		socket.emit("clientMsg", { msg, room });
		setMsg("");
		setRoom("");
	};

	useEffect(() => {
		socket.on("getMsg", (data) => {
			setMessages([...messages!, data]);
		});
	}, [socket, messages]);
	console.log(messages);

	return (
		<div className="App">
			<div>
				<h1>Messages</h1>
				{messages.map((msg, i) => (
					<p key={i} className="msg">
						{msg}
					</p>
				))}
			</div>
			<form onSubmit={handleSubmit} className="user-interface">
				<input
					value={room}
					onChange={(e) => setRoom(e.target.value)}
					type="text"
					placeholder="Enter Room Key"
				/>

				<input
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
					type="text"
					placeholder="Enter message"
				/>

				<button>Send Message</button>
			</form>
		</div>
	);
}

export default App;
