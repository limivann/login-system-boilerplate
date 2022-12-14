const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const { jwtSign, jwtVerify } = require("./jwt/jwtAuth");
const { serialize } = require("cookie");
require("dotenv").config();

module.exports.getLogin = async (req, res) => {
	// bearer token
	const cookies = parseCookie(req.headers.cookie);
	const token = cookies?.token;
	if (token == undefined) {
		res.json({ loggedIn: false });
		return;
	}
	try {
		const decodedToken = await jwtVerify(token, process.env.JWT_SECRET);
		res.json({ loggedIn: true, token });
		return;
	} catch (error) {
		console.log(error);
		res.json({ loggedIn: false });
		return;
	}
};

module.exports.attemptLogin = async (req, res) => {
	const { username, password } = req.body;
	try {
		// check if username exist
		const usernameExistUser = await pool.query(
			"SELECT * FROM users WHERE user_name = $1",
			[username]
		);
		if (usernameExistUser.rowCount === 0) {
			return res.json({
				loggedIn: false,
				status: "Username or password incorrect",
			});
		}
		// check if password matches
		const validPassword = await bcrypt.compare(
			password,
			usernameExistUser.rows[0].passhash
		);
		if (!validPassword) {
			return res.json({ loggedIn: false, status: "Password incorrect" });
		}

		try {
			const token = await jwtSign(
				{
					username: usernameExistUser.rows[0].user_name,
					id: usernameExistUser.rows[0].user_id,
				},
				process.env.JWT_SECRET,
				{ expiresIn: "1min" }
			);
			// Set httponly cookie, maxage to 60 seconds
			const serialized = serialize("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
				maxAge: 60 * 60 * 24 * 3600,
				path: "/",
			});
			res.setHeader("Set-Cookie", serialized);
			res.json({ loggedIn: true, token });
			return;
		} catch (error) {
			console.log(error);
			res.json({
				loggedIn: false,
				status: "smth went wrong, try again later",
			});
		}
	} catch (err) {
		console.log(err.message);
		return res.json({ loggedIn: false, status: "server error" });
	}
};

module.exports.attemptRegister = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		// check if username exist
		const usernameExistUser = await pool.query(
			"SELECT user_name FROM users WHERE user_name = $1",
			[username]
		);
		if (usernameExistUser.rowCount !== 0) {
			return res.json({ loggedIn: false, status: "Username taken" });
		}
		// check if email exist
		const emailExistUser = await pool.query(
			"SELECT user_email FROM users WHERE user_email = $1",
			[email]
		);
		if (emailExistUser.rowCount !== 0) {
			return res.json({ loggedIn: false, status: "Email taken" });
		}

		// hash password
		const salt = await bcrypt.genSalt(10);
		const passHash = await bcrypt.hash(password, salt);

		// add new user into db
		const user = await pool.query(
			"INSERT INTO users (user_name, user_email, passhash) VALUES ($1, $2, $3) RETURNING *",
			[username, email, passHash]
		);
		try {
			const token = await jwtSign(
				{
					username,
					id: user.rows[0].user_id,
				},
				process.env.JWT_SECRET,
				{ expiresIn: "1min" }
			);
			// Set httponly cookie, maxage to 60 seconds
			const serialized = serialize("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
				maxAge: 60,
				path: "/",
			});
			res.setHeader("Set-Cookie", serialized);
			res.json({ loggedIn: true, token });
			return;
		} catch (error) {
			console.log(error);
			res.json({
				loggedIn: false,
				status: "smth went wrong, try again later",
			});
		}
	} catch (err) {
		console.error(err.message);
		return res.json({ loggedIn: false, status: "server error" });
	}
};

module.exports.attemptLogout = (req, res) => {
	// check if user is logged in by checking there is req.session (if no, just return)
	if (req.session && req.session.user) {
		req.session.destroy(err => {
			if (err) {
				res.status(400).json({ status: "Unable to log out" });
			} else {
				res.json({ status: "Logout successful", logout: true });
			}
		});
	} else {
		res.json({ status: "Already log out" });
	}
};

// parse cookies
const parseCookie = str =>
	str
		.split(";")
		.map(v => v.split("="))
		.reduce((acc, v) => {
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
			return acc;
		}, {});
