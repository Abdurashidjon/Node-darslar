require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');

module.exports = function () {
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'logs/vd-logs.log', level: 'error' }));
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/practic-logs', level: 'info' }));
    winston.exceptions.handle(new winston.tranports.File({ filename: 'logs/vd-logs.log' }))
    process.on('uncaughtException', ex => {
        throw ex;
    });
}