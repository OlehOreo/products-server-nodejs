import app from "./app.js";

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
	console.log(`start connection successful, port: ${PORT}`);
});
