const express = require("express");
const router = express.Router();
const {
	validateSignupForm,
	validateRegisterForm,
} = require("../controllers/validateForm");

router.route("/login").post(validateSignupForm, (req, res) => {
	return res.json("Form good");
});

router.route("/register").post(validateRegisterForm, (req, res) => {
	return res.json("Form good");
});

module.exports = router;
