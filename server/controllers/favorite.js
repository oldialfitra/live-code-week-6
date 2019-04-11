const Favorite = require('../models/favorite')

class ControllerFavorite {

    static addFavorite(req, res) {
        Favorite
            .create({
                joke: req.body.joke,
                userId: req.loggedIn.id
            })
            .then(function (newJoke) {
                res.status(201).json(newJoke)
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            })
    }

    static getFavorite(req, res) {
        Favorite
            .find({
                userId: req.loggedIn.id
            })
            .then(function (myFavorite) {
                res.status(200).json(myFavorite)
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            })
    }

    static deleteFavorite(req, res) {
        Favorite
            .findByIdAndDelete(req.params.id)
            .then(function (oneFavorite) {
                res.status(200).json(oneFavorite)
            })
            .catch(function (err) {
                res.status(500).json({
                    message: err
                })
            })
    }

}

module.exports = ControllerFavorite