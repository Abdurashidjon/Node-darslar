const express = require('express');
const router = express.Router();
const {category, validate} = require('../models/category')



router.get('/', async (req, res) => {
    const categories = await Category.find().sort('name');
    res.send(categories);
})

router.get('/', async (req, res) => {
    const categories = await Category.find().sort('name');
    res.send(categories);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(egrror.details[0].message);
    let category = new category({
        name: req.body.name
    });
    category = await category.save();
    res.status(201).send(category);
});

router.get('/:id', async (req, res) => {
    let category = await Category.findById(req.params.id);
    if (!category)
        return res.status(404).send('Berilgan id ga mos element topilmadi');
    res.send(category)
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
       if(!category)
       return res.status(404).send('berilgan id ga mos toifa topilmadi');
       res.send(category);
});

router.delete('/:id', async(req,res)=>{
    let category = await Category.findByIdAndRemove(req.params.id);
    if(!category)
    return res.status(404).send('berilgan id ga mos element yoq uni delete qiliwni iloji yoq');
    res.send(category);
});


function validates(category){
    const schema=Joi.object({
        name: 
        Joi
        .string() 
        .min(3)
        .required()
    });
    return schema.validates(category);
}


module.exports = router;