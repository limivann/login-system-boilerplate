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

module.exports = router;
