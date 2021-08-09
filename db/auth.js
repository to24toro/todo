const passport = require('passport')
const Strategy = require('passport-twitter')
const express = require('express')
const ENVIROMENT = express().get('env')
const config = require('../config.json')[ENVIROMENT]

module.exports = function() {


    // Configure the Twitter strategy for use by Passport.
    //
    // OAuth 1.0-based strategies require a `verify` function which receives the
    // credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
    // user's behalf, along with the user's profile.  The function must invoke `cb`
    // with a user object, which will be set at `req.user` in route handlers after
    // authentication.
    passport.use(new Strategy({
            consumerKey: config.twitter_consumer_key,
            consumerSecret: config.twitter_consumer_secret,
            callbackURL: config.callback_url,
            //proxy: trustProxy
        },
        function(token, tokenSecret, profile, cb) {
            passport.session.id = profile.id
            profile.twitter_token = token
            profile.twitter_token_secret = tokenSecret

            process.nextTick(() => {
                return cb(null, profile)
            })
        }))

    passport.serializeUser(function(user, cb) {
        cb(null, user)
    })

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj)
    })

}