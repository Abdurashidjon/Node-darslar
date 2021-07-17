const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/practice2', { useNewUrlParser: true, useUnifedTopology: true })
    .then(() => console.log('Mongodb ga ulanish hosil qilindi...'))
    .catch((err) => console.error('Mongodbga ulanish hosil qilishda xato ruy berdi...', err));

    const   authorSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String
    });

    const bookSchema = new mongoose.Schema({
        title: String,
        author:{
            type: authorSchema,
            required: true
        }
    })

    const Author = mongoose.model('Author',authorSchema);
    const Book = mongoose.model('Book',bookSchema);

    async function createBook(title,author) {
        const book = new Book({
            title,
            author
        })
        const result = await book.save();
        console.log(result);
    }

    createBook('Nodejs tuliq qullanma',
    new Author({
        fistName:'Abdurashid',
        lastName: "Gaybullayev",
        email: "abdurashid@gmail.com"
    }));