// require("dotenv").config();
// const session = require("express-session");
// const RedisStore = require("connect-redis")(session);
// const redisClient = require("../redis");

// module.exports.sessionMiddleware = session({
// 	secret: process.env.COOKIE_SECRET,
// 	credentials: true,
// 	name: "sid",
// 	resave: false,
// 	saveUninitialized: false,
// 	store: new RedisStore({ client: redisClient }),
// 	cookie: {
// 		secure: process.env.NODE_ENV === "production", // use https whenever
// 		httpOnly: true,
// 		expires: 1000 * 60 * 60, // 1hr
// 		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
// 	},
// });
