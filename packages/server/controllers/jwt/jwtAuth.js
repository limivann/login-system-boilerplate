require("dotenv").config();
const e = require("express");
const jwt = require("jsonwebtoken");

const jwtSign = (payload, secret, options) =>
	new Promise((resolve, reject) => {
		jwt.sign(payload, secret, options, (err, token) => {
			if (err) {
				reject(err);
			} else {
				resolve(token);
			}
		});
	});

const jwtVerify = (token, secret) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				reject(err);
			} else {
				resolve(token);
			}
		});
	});

module.exports = { jwtSign, jwtVerify };
