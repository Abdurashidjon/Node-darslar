const { User} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Joi = require('joi'); 
const bcrypt = require('bcrypt');



router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('email yoki parol xato  ');

    const isValidPassword = bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword)
    return res.status(400).send('Email yoki parol notugri ');
  const token = user.generateAuthToken();
  res.header('x-auth-token',token).send(true);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required()
    });
    return schema.validate(req);
}

module.exports = router;    