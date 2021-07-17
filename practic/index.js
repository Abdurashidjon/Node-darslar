const express = require('express');
const app = express();
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');
const coursesRoute = require('./routes/courses');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/practic',{useNewUrlParser: true,useUnifiedTopology:true})
.then(()=>{
    console.log('MongoDb ga ulanish hosil qilindi...');
})
.catch((err)=>{
    console.log('Mongodb ga ulanishda xato roy berdi',err);
});
//mongoose.set('useFindAndModifiy',false);

app.use(express.json());
app.use('/api/categories',categoriesRoute);
app.use('/api/customers',customersRoute);
app.use('/api/courses',coursesRoute);
 
const port = process.env.PORT || 5000;
 app.listen(port,()=>{
     console.log(`${port} chi portni eshitishni boshladim...`);
 });