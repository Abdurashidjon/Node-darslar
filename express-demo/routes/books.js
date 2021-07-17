const Joi = require('joi');
const express = require('express');
const router=express.Router();

const books = [
    { id: 1, name: 'Rich dad and poor dad' },
    { id: 2, name: 'Ikki eshik orasi' },
    { id: 3, name: 'Osmon qoynida' }
]
router.get('/', (req, res) => {
    res.send(books);
})

router.post('/', (req, res) => {
    let { error } = validateBook(req.body);
    //console.log(`req---${req.body}`);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book);
    res.status(201).send(book);
})

router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book)
        return res.status(404).send('Kitob topilmadi: ')
    res.send(book);

})

/* app.get('/api/articles/:year/:month', (req, res) => {
    res.send(req.query);
}); */


router.put('/:id', (req, res) => {
    // Kitobni bazadan izlab topish, 
    //agar u bazada mavjuda bomasa 404 xatoni qaytariw
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).send('berilgan idga mos kitob topilmadi');


    //agar kitob topilsa validatsiya qiliw
    //agar kitob validatsiyadan otmasa 400 qaytariw

    const { error } = validateBook(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // kiotbni yangilash
    book.name = req.body.name;
    // yangilangan kitobni qaytariw
    res.send(book)
});

router.delete('/:id', (req, res) => {
    //kitobni id boyicha izlab topamiz
    // agar topilmasa 404 qaytaramiz
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).send('Berilgan Id ga teng maxsulot topilmadi');

    //topilsa uni ochirib tawaymiz
    const bookIndex = books.indexOf(book);
    books.splice(bookIndex, 1);
    // topilgan kitobni qaytarib beramiz
    res.send(book)
})

function validateBook(book) {
    const bookSchema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return bookSchema.validate(book);

};

module.exports = router;
