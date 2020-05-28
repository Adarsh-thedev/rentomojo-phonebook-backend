const express = require('express');
const {check} = require('express-validator');
const router = express.Router();

const {
        createContact, 
        getAllContacts, 
        updateContact, 
        getContactById,
        deleteContact
    } = require('../controllers/contact');

//params
router.param('contactId', getContactById);

//routes
//create
router.post('/contact', [
    check('name')
    .isLength({min : 1})
    .withMessage('Name is required'),
    
    check('email')
    .isEmail()
    .withMessage('Invalid email')
], createContact);

//read(for testing)
router.get('/contacts', getAllContacts);

//update
router.put('/contact/:contactId', updateContact);

//delete
router.delete('/contact/:contactId', deleteContact);

module.exports = router;