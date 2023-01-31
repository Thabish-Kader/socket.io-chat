import { useState } from "react";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3000");
socket.on("connect", () => {
	console.log(socket.id);
});

function App() {
	return (
		<div className="">
			<h1>Hello</h1>
		</div>
	);
}

export default App;
