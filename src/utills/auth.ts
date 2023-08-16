const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const generateToken = async (user: Object) => {
	console.log(user);
	const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY, {
		expiresIn: "3h", // You can adjust the expiration time as needed
	});
	return token;
};

const authUttils = {
	generateToken,
};
module.exports = authUttils;
