const { request } = require('express');
//const Joi = require('joi');
const express = require('express');
const app = express();
//const logger = require('./logger');
const authenfication = require('./authen')
const helmet = require('helmet')
const morgan = require('morgan');
const config=require('config')
const  books = require('./routes/books')
const home = require('./routes/home')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(logger);
app.use(authenfication);
app.use(helmet());
app.set('view enginee','pug')
app.use('/api/books',books)
app.use('/', home)



if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log("Ishladikuuu");
}
console.log(config.get('name'));
console.log(config.get('mailserver.host'));
//console.log(config.get('mailserver.password'));

console.log(process.env.NODE_ENV);
console.log(app.get('env'));




const port = process.env.PORT || 3000
app.listen(3000, () => {
    console.log('3000- portni eshitishni boshladim/   /////');
})