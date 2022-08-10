const bcrypt = require("bcrypt");
const pool = require("../db");

module.exports.getLogin = async (req, res) => {
	if (req.session.user && req.session.user.id) {
		res.json({ loggedIn: true, username: req.session.user.username });
	} else {
		res.json({ loggedIn: false });
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
		req.session.user = {
			username: usernameExistUser.rows[0].user_name,
			id: usernameExistUser.rows[0].user_id,
		};
		return res.json({
			loggedIn: true,
			username: usernameExistUser.rows[0].user_name,
		});
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
		req.session.user = {
			username,
			id: user.rows[0].user_id,
		};
		return res.json({ loggedIn: true, username });
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
