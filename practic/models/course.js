const Joi = require('joi');
const mongoose = require('mongoose');
const { category } = require('../models/category');

const Course = mongoose.model('Courses', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 30
    },
    category: {
        type: String,
        required: true
    },
    trainer: {
        type: String,
        required: true
    },
    tags: {
        type:[String]
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        required: true
    }
}));

function validateCourse(course){
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        categoryId: Joi.string().required(),
        trainer: Joi.string().min(5).max(30).required(),
        status: Joi.string().required(),
        tags: Joi.array().items(Joi.string())
    })
    return schema.validate(course);
}

exports.Course = Course;
exports.validate = validateCourse;