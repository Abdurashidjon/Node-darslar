const winston = require('winston');
const errorMiddleware = require('./middleware/error');
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');
const coursesRoute = require('./routes/courses');
const entrollmentRoute = require('./routes/enrollment');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);
    res.status(500).send('Serverda kutilmagan xato roy berdi...')
}