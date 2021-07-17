const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/practice',{useNewUrlParser: true, useUnifedTopology: true})
.then(()=>console.log('Mongodb ga ulanish hosil qilindi...'))
.catch((err)=> console.error('Mongodbga ulanish hosil qilishda xato ruy berdi...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
}));

const Book = mongoose.model('Book', new mongoose.Schema({
    title: String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Author'
    }
}));

async function createAuthor(firstName,lastName,email) {
    const author =new Author({
        firstName,
        lastName,
        email
    })

    const result = await author.save();
    console.log(result);
};

async function createBook(title,authorId){
    const book =  new Book({
        title: title,
        author: authorId
    });
    const result =  await book.save();
    console.log(result);
}

async function listBooks() {
    const book = await Book
    .find()
    .populate('author','firstName -_id')
    .select('title author');
    console.log(book);
}

//createAuthor('Abdurashid','Gaybullayev','abdurashid@gmail.com');
//createBook(`NodeJs to'liq qo'llanma`,'60ebf8f4010b790170db5ba1')
listBooks();