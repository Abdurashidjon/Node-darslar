const { Enrollment, validate } = require('../models/enrollment');
const { Course } = require('../models/course');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
//const { Enrollment } = require('../models/enrollment');
const router = express.Router();

router.get('/', async (req, res) => {
    const enrol = await Enrollment.find().sort('-dateStart');
    res.send(enrol);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer)
        return res.status(400).send('Berilgan Id ga mos mijoz topilmadi... ');

    const course = await Course.findById(req.body.courseId);
    if (!course)
        return res.status(400).send('Berilgan Id ga mos mijoz topilmadi... ');

    let enrollment = new Enrollment({
        customer: {
            _id: customer._id,
            name: customer.name
        },
        course: {
            _id: course._id,
            title: course.title
        },
        courseFee: course.fee
    });
    if(customer.isVip)
    enrollment.courseFee = course.fee-(0.2* course.fee);
    enrollment = await enrollment.save();
    customer.bonusPoints++;
    customer.save();

    req.send(enrollment)
});
 router.get('/:id', async(req,res)=>{
     const enrol = await Enrollment.findById(req.params.id);
     if(!enrollment)
     return res.status(404).send('Berilgan Id ni bazangizda yoq');
     res.send(enrol);
 });
 module.exports = router;

