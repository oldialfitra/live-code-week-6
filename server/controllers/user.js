const User = require('../models/user'),
    { decrypt } = require('../helpers/bcrypt'),
    jwt = require('jsonwebtoken')

class ControllerUser {
    static registerUser(req, res) {
        User
            .create({
                email: req.body.email,
                password: req.body.password
            })
            .then(function (newUser) {
                res.status(201).json(newUser)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static loginUser(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(function (uLogin) {
                if (!uLogin) {
                    throw new Error('username / password wrong')
                }
                else {
                    if (decrypt(req.body.password, uLogin.password) === false) {
                        throw new Error('username / password wrong')
                    }
                    else {
                        let token = jwt.sign({
                            email: uLogin.email,
                            id: uLogin._id
                        }, process.env.SECRET)
                        res.status(200).json({ access_token: token })
                    }
                }
            })
            .catch(function (err) {
                res.status(500).json({
                    message: err.message
                })
            })
    }
}

module.exports = ControllerUser