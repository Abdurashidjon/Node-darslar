const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB ulanish hosil qilindi ....');
    })
    .catch((err) => {
        console.error(`MongoDB ga ulanish vaqtida xato ro'y berdi....`);
    });

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    author: String,
    tags: {
        type: Array,
        validate:{
            isAsync: true,
            validator: function(val, callback){
                setTimeout(()=>{
                    const result = val && val.length > 0;
                    callback(result);
                },5000);
               
            },
            message: 'Kitobda kamida bitta tag bolishi kerak'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 300
    },
    category: {
        type: String,
        required: true,
        enum: ['classic', 'biography', 'science'],
        // match: /expression/
    }
});
const Book = mongoose.model("Book", bookSchema);

async function createBook() {
    const book = new Book({
        name: 'Nodjs qullanma ',
        author: 'Abdurashid Gaybullayev',
        tags: ['js', 'dasturlash', 'node'],
        isPublished: true,
        price: 50,
        category: `classic`
    });

    try {
        const savedBook = await book.save();
        console.log(savedBook);
    }
    catch (ex) {
        console.log(ex);
    }
}

async function getBooks() {
    const books = await Book.find({
        author: 'Abdurashid Gaybullayev',
        isPublished: true
    })
        .or([{ author: 'Abdurashid Gaybullayev' }, { isPublished: true }])
        .limit(2)
        .sort({ name: 1 })
        //.select({name:1,tags:1})
        .count();
    console.log(books);
}


async function deleteBook(id) {
    const result = await Book.findByIdAndRemove({ _id: id });
    console.log(result);
}
//deleteBook('60e53e18b38b9d1354d96ba9');
createBook();
