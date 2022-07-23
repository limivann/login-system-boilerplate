const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./routers/authRouter");
const session = require("express-session");

// MIDDLEWARES
app.use(helmet());
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	})
);
app.use(express.json());
app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		credentials: true,
		name: "sid",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.ENVIROMENT === "production", // use https whenever
			httpOnly: true,
			expires: 1000 * 60 * 60, // 1hr
			sameSite: process.env.ENVIROMENT === "production" ? "none" : "lax",
		},
	})
);

// ROUTES
app.use("/auth", authRouter);
app.get("/", (req, res) => {
	res.json("HUH");
});
app.listen(5000, () => {
	console.log("Listening at port 5000");
});
