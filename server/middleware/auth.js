const jwt = require('jsonwebtoken'),
Favorite = require('../models/favorite')

module.exports = {
    authentication(req, res, next) {
        if (req.headers.access_token) {
            req.loggedIn = jwt.decode(req.headers.access_token)
            next()
        }
        else {
            res.status(400).json({
                message: 'user not authenticate'
            })
        }
    },
    authorization(req, res, next) {
        Favorite
        .findOne({
            userId: req.loggedIn.id
        })
        .then(function (oneFavorite) {
            if (!oneFavorite) {
                res.status(400).json({
                    message: 'user not authorize'
                })
            }
            else {
                next()
            }
        })
    }
}