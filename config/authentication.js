const { User } = require('../models');
const e = require("./errorList");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            res.status(500).json({
                error: e.email.invalidEmail
            });
        }else{
            if( bcrypt.compare(password , user.password) ){
                req.user = user;
                next();
            }else {
                res.status(404).json({
                    error: e.users.invalidUserCredentials
                });
            }    
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const tokenVerification = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if(!token){
            res.status(500).json({
                error: e.login.invalidToken
            });
        }else {
            jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (error, user) => {
                if(error){
                    res.status(500).json({
                        error: error.message
                    })
                }
                req.user = user;
                next();
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { authentication, tokenVerification };