const express = require('express')
const passport = require('passport')
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('login');
})

router.get('/login/twitter.com', passport.authenticate('twitter'))

router.get('/oauth/callback/twitter.com',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res, next) {
        res.redirect('/')
    })

router.get('/logout', function(req, res, next) {
    req.logout()
    res.redirect('/')
})

module.exports = router;