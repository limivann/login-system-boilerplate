const {
	LoginFormSchema,
	RegistrationSchema,
} = require("@login-system-boilerplate/common");

module.exports.validateSignupForm = async (req, res, next) => {
	const formData = req.body;
	try {
		const validForm = await LoginFormSchema.validate(formData);
		if (validForm) {
			console.log("Form is good");
			next();
		}
	} catch (err) {
		console.error(err.message);
		res.status(422).json({ status: err.message });
	}
};

module.exports.validateRegisterForm = async (req, res, next) => {
	const formData = req.body;
	try {
		const validForm = await RegistrationSchema.validate(formData);
		if (validForm) {
			console.log("Form is good");
			next();
		}
	} catch (err) {
		console.error(err.message);
		res.status(422).json({ status: err.message });
	}
};
