const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { e } = require("../config");
const { User } = require("../models");

const signup = async (req,res) => {
    try {
        const salts =  process.env.BCRYPT_SALT_ROUNDS;
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const { username, email, password } = req.body;
        const userInstance = await User.create({
            username,
            email,
            password
        });
        if(!userInstance){
            res.json({
                error: e.users.invalidUserCredentials
            });
        }else{
            res.status(200).json({
                message: e.users.userSuccess,
                body: userInstance
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const login = async (req,res) => {
    try {
        const token = jwt.sign(req.user.toJSON(), process.env.JWT_ACCESS_TOKEN);
        // const token = jwt.sign({req.user}, process.env.JWT_ACCESS_TOKEN, { expiresIn : 604800 });
        // if you want to set expiration on the token
        res.status(200).json({
            message: e.login.loginSuccess,
            token,
            body: {
                ...req.user._doc
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const logout = async (req,res) => {
    res.json({
        message: e.login.logoutSuccess,
        body: req.user
    });
};

module.exports = {
    signup,
    login,
    logout,
}