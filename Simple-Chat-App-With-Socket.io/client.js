import io from "socket.io-client";

const socket = io("http://localhost:3000");
socket.on("connect", () => {
	console.log("Socket connected");
});

socket.on("message", (msg, id) => {
	console.log(`${id}: ${msg}`);
});
process.stdin.on("data", (data) => {
	socket.emit("chat", data.toString().trim());
});
