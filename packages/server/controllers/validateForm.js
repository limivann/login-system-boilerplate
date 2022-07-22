const Yup = require("yup");
const SignupFormSchema = Yup.object({
	username: Yup.string()
		.min(6, "Username too short")
		.max(28, "Username too long")
		.required("Username required"),
	password: Yup.string()
		.required("Password required")
		.min(6, "Password too short")
		.max(28, "Password too long"),
});

const RegistrationSchema = Yup.object({
	username: Yup.string()
		.min(6, "Username too short")
		.max(28, "Username too long")
		.required("Username required"),
	password: Yup.string()
		.required("Password required")
		.min(6, "Password too short")
		.max(28, "Password too long"),
	email: Yup.string()
		.email("Field should contain a valid e-mail")
		.max(255)
		.required("E-mail is required"),
});

const validateSignupForm = async (req, res, next) => {
	const formData = req.body;
	try {
		const validForm = await SignupFormSchema.validate(formData);
		if (validForm) {
			console.log("Form is good");
			next();
		}
	} catch (err) {
		console.error(err.message);
		res.status(422).json({ status: err.message });
	}
};

const validateRegisterForm = async (req, res, next) => {
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

module.exports = { validateSignupForm, validateRegisterForm };
