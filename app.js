const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const app = express()
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
require('./db/auth')()
    // require('./db/db')()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(require('express-session')({
    secret: 'Secret keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: 'auto',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
}))
app.use(passport.initialize())
app.use(passport.session())

// router
app.use('/', indexRouter)
app.use('/', authRouter)

app.use(function(req, res, next) {
    next(createError(404))
})

module.exports = app