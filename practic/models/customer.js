const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    }
});

const Customer = mongoose.model('Customer', customerSchema);
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        isVip: Joi.required(),
        phone: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(customer);
}
exports.validate = validateCustomer;
exports.Customer = Customer;