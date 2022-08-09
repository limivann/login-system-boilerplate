require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./routers/authRouter");
const { sessionMiddleware } = require("./controllers/sessionMiddleware");

// MIDDLEWARES
app.use(helmet());
app.use(
	cors({
		origin: [process.env.CLIENT_URL],
		credentials: true,
	})
);
app.use(express.json());
app.use(sessionMiddleware);
app.set("trust proxy", 1);

// ROUTES
app.use("/auth", authRouter);

app.listen(5000, () => {
	console.log("Listening at port 5000");
});
