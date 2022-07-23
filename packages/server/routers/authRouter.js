const express = require("express");
const router = express.Router();
const {
	validateSignupForm,
	validateRegisterForm,
} = require("../controllers/validateForm");
const pool = require("../db");
const bcrypt = require("bcrypt");

router.route("/login").post(validateSignupForm, async (req, res) => {
	const { email, password } = req.body;
	try {
		// check if email exist
		const emailExistUser = await pool.query(
			"SELECT * FROM users WHERE user_email = $1",
			[email]
		);
		if (emailExistUser.rowCount === 0) {
			return res.json({
				loggedIn: false,
				status: "Email or password incorrect",
			});
		}
		// check if password matches
		const validPassword = await bcrypt.compare(
			password,
			emailExistUser.rows[0].passhash
		);
		if (!validPassword) {
			return res.json({ loggedIn: false, status: "Password incorrect" });
		}
		return res.json({
			loggedIn: true,
			username: emailExistUser.rows[0].user_name,
		});
	} catch (err) {
		console.log(err.message);
		return res.json({ loggedIn: false, status: "server error" });
	}
});

router.route("/register").post(validateRegisterForm, async (req, res) => {
	const { username, email, password } = req.body;
	try {
		// check if email exist
		const emailExistUser = await pool.query(
			"SELECT user_email FROM users WHERE user_email = $1",
			[email]
		);
		if (emailExistUser.rowCount !== 0) {
			return res.json({ loggedIn: false, status: "Email already exist" });
		}
		// hash password
		const salt = await bcrypt.genSalt(10);
		const passHash = await bcrypt.hash(password, salt);

		// add new user into db
		const user = await pool.query(
			"INSERT INTO users (user_name, user_email, passhash) VALUES ($1, $2, $3) RETURNING *",
			[username, email, passHash]
		);
		return res.json({ loggedIn: true, username });
	} catch (err) {
		console.error(err.message);
		return res.json({ loggedIn: false, status: "server error" });
	}
});

module.exports = router;
