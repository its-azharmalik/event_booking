const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { e } = require('../config');
const { User } = require('../models');

const signup = async (args) => {
	try {
		const user = await User.findOne({ email: args.userInput.email });
		if (user) throw new Error('User already exists');
		const salts = process.env.BCRYPT_SALT_ROUNDS;
		const hashedPassword = await bcrypt.hash(args.userInput.password, 10);
		const { username, email } = args.userInput;
		console.log(hashedPassword);
		const userInstance = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		if (!userInstance) {
			return {
				error: e.users.invalidUserCredentials,
			};
		} else {
			return { ...userInstance._doc, password: null, _id: userInstance.id };
		}
	} catch (error) {
		return error;
	}
};

const login = async (req, res) => {
	try {
		const token = jwt.sign(req.user.toJSON(), process.env.JWT_ACCESS_TOKEN);
		// const token = jwt.sign({req.user}, process.env.JWT_ACCESS_TOKEN, { expiresIn : 604800 });
		// if you want to set expiration on the token
		res.status(200).json({
			message: e.login.loginSuccess,
			token,
			body: {
				...req.user._doc,
			},
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
};

const logout = async (req, res) => {
	res.json({
		message: e.login.logoutSuccess,
		body: req.user,
	});
};

module.exports = {
	signup,
	login,
	logout,
};
