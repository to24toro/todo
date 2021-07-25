const express = require('express')
const config = require('./config.json')[express().get('env')]
module.exports = {
    client: config.client,
    connection: {
        database: config.database,
        user: config.user,
        password: config.password,
    },
    pool: {
        min: 2,
        max: 10
    },
};