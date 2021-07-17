const express = require('express');
const router = express.Router();
const {Customer,validate} = require('../models/customer')

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})



router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.status(201).send(customer);
});

router.get('/:id', async (req, res) => {
    let customers = await Customer.findById(req.params.id);
    if (!customers)
        return res.status(404).send('Siz qidirgan id boyicha malumot yoq xali...')
    res.send(customers)
});
router.put('/:id', async(req,res)=>{
    const {error} = validate(req.body);
    if(error)
    return res.status(404).send(error.details[0].message)
    let custom = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if (!custom)
        return res.status(404).send('berilgan id ga mos toifa topilmadi');
    res.send(custom);

    
})


router.delete('/:id', async (req, res) => {
    let custom = await Customer.findByIdAndRemove(req.params.id);
    if (!custom)
        return res.status(404).send('berilgan id ga mos element yoq uni delete qiliwni iloji yoq');
    res.send(custom);
});

module.exports = router;