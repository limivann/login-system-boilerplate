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

router.route("/login").get(getLogin).post(validateSignupForm, attemptLogin);

router.route("/register").post(validateRegisterForm, attemptRegister);

module.exports = router;
