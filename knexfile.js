const express = require('express')
const ENVIROMENT = express().get('env')
const config = require('./config.json')[ENVIROMENT]
if (ENVIROMENT !== 'production') {
    module.exports = {
        client: config.client,
        connection: {
            database: config.database,
            user: config.user,
            password: config.password,
            host: config.host,
            port: config.port,
        },
        pool: {
            min: 2,
            max: 10
        },
    };
} else {
    module.exports = {
        client: config.client,
        connection: {
            socketPath: `/cloudsql/${config.socketPath}`,
            database: config.database,
            user: config.user,
            password: config.password,
            port: config.port
        },
        pool: {
            min: 1,
            max: 10
        },
    };
}