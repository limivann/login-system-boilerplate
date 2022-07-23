const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./routers/authRouter");

// MIDDLEWARES
app.use(helmet());
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	})
);
app.use(express.json());

// ROUTES
app.use("/auth", authRouter);
app.get("/", (req, res) => {
	res.json("HUH");
});
app.listen(5000, () => {
	console.log("Listening at port 5000");
});
