const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect('mongodb://localhost/practic', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            winston.debug('MongoDb ga ulanish hosil qilindi...');
        });
    mongoose.set('useFindAndModifiy', false);
}
 