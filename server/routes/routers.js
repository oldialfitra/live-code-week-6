const router = require('express').Router(),
    controllerUser = require('../controllers/user'),
    controllerFavorite = require('../controllers/favorite'),
    {authentication, authorization} = require('../middleware/auth')

router.post('/register', controllerUser.registerUser)

router.post('/login', controllerUser.loginUser)

router.get('/favorites', authentication, controllerFavorite.getFavorite)

router.post('/favorites', authentication, controllerFavorite.addFavorite)

router.delete('/favorites/:id', authentication, authorization, controllerFavorite.deleteFavorite)

module.exports = router