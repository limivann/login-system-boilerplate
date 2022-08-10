const Yup = require("yup");
const LoginFormSchema = Yup.object({
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

module.exports = { LoginFormSchema, RegistrationSchema };
