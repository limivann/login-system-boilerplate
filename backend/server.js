if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const session = require("cookie-session");

/* Secrutiy Middlewares */
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require("csurf");
const rateLimit = require("express-rate-limit");
const app = express();

app.use(helmet());
app.use(hpp());

app.use(
	session({
		name: "session",
		keys: process.env.COOKIE_SECRET,
		maxAge: 24 * 60 * 60 * 1000,
	})
);

const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: "too many requests sent by this ip, please try again in an hour !",
});

app.use(csurf());
app.use(limiter);

app.get("/", (req, res) => {
	return res.json({ error: true });
});

app.listen(process.env.PORT);
