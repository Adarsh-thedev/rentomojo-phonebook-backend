const express = require('express');
const {check} = require('express-validator');
const router = express.Router();

const {createContact, getAllContacts} = require('../controllers/contact');

//routes
//create
router.post('/contact', [
    check('name')
    .isLength({min : 1})
    .withMessage('Name is required'),

    check('phoneNumber')
    .isMobilePhone()
    .withMessage('Invalid phone number'),
    
    check('email')
    .isEmail()
    .withMessage('Invalid email')
], createContact);

//read(for testing)
router.get('/contacts', getAllContacts);

module.exports = router;