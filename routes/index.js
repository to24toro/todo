const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const config = require('../config.json')[express().get('env')]
const knex = require('../db/knex')

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})


router.get('/', function(req, res, next) {
    knex('todo_task')
        .select("*")
        .then(function(results) {
            console.log(results)
            res.render('index', {
                title: 'ToDo App',
                todos: results,
            })
        })
        .catch(function(err) {
            console.error(err)
            res.render('index', {
                title: 'ToDo App',
            })
        })
})

router.post('/', (req, res, nxt) => {
    const todo = req.body.add
    const date = '2018/05/31'
    const description = 'SAMPLE'
    knex('todo_task').insert({ label: todo, user_id: 1, date: date, done: 0, description: description })
        .then(() => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
            res.render('index', {
                title: 'Todo APPPPPP'
            })
        })
})

module.exports = router;