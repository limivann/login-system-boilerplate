const express = require("express");
const router = express.Router();
const {
	validateSignupForm,
	validateRegisterForm,
} = require("../controllers/validateForm");
const {
	getLogin,
	attemptLogin,
	attemptRegister,
} = require("../controllers/authController");
const { rateLimiter } = require("../controllers/rateLimiter");

router
	.route("/login")
	.get(getLogin)
	.post(validateSignupForm, rateLimiter(10, 5), attemptLogin);

router
	.route("/register")
	.post(validateRegisterForm, rateLimiter(10, 10), attemptRegister);

router.delete("/logout", (req, res) => {
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
});

module.exports = router;
