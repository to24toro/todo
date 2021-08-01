const passport = require('passport')
const Strategy = require('passport-twitter')
const ENVIROMENT = express().get('env')
const config = require('./config.json')[ENVIROMENT]

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
            consumerSecret: consumer.twitter_consumer_secret,
            callbackURL: consumer.callback_url,
            //proxy: trustProxy
        },
        function(token, tokenSecret, profile, cb) {
            // In this example, the user's Twitter profile is supplied as the user
            // record.  In a production-quality application, the Twitter profile should
            // be associated with a user record in the application's database, which
            // allows for account linking and authentication with other identity
            // providers.
            console.log(profile)
            return cb(null, profile)
        }))

    passport.serializeUser(function(user, cb) {
        cb(null, user)
    })

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj)
    })

}