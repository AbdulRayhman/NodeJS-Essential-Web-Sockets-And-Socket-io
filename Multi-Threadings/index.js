import express from "express";
import { Worker } from "worker_threads";
const app = express();
const port = process.env.port || 3000;
const THREAD_COUNT = 4;
function calculateCount() {
	let counter = 0;
	for (let i = 0; i < 20_000_000_000; i++) {
		counter++;
	}
	return counter;
}
app.get("/non-blocking", (req, res, next) => {
	res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res, next) => {
	const countRes = await calculateCount();
	res.status(200).send(`result is ${countRes}`);
});

app.get("/blocking-with-workers", async (req, res, next) => {
	const worker = new Worker("./worker.js");
	worker.on("message", (data) => {
		res.status(200).send(`result is ${data}`);
	});
	worker.on("error", (err) => {
		res.status(404).send(`An error occurred: ${msg}`);
	});
});

app.get("/blocking-with-workers-optimization", async (req, res, next) => {
	const worker = new Worker("./workers-optimization.js", {
		workerData: { threadsCount: THREAD_COUNT },
	});
	worker.on("message", (data) => {
		res.status(200).send(`result is ${data}`);
	});
	worker.on("error", (err) => {
		res.status(404).send(`An error occurred: ${msg}`);
	});
});
app.listen(port, () => {
	console.log(`Application is running on PORT ${port}`);
});
console.log("Hello World");
