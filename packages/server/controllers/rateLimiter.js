const redisClient = require("../redis");

module.exports.rateLimiter = (timeToExpire = 60, limitCount = 10) => {
	return async (req, res, next) => {
		const ip = req.connection.remoteAddress;
		const [response] = await redisClient
			.multi()
			.incr(ip)
			.expire(ip, timeToExpire)
			.exec();
		console.log(response);
		if (response[1] > limitCount) {
			return res.json({
				loggedIn: false,
				status: "Rate limited, try again later",
			});
		}
		next();
	};
};
