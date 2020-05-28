const {Contact} = require('../models/contact');
const {validationResult} = require('express-validator');

//create
exports.createContact = (req,res) => {

    const errors = validationResult(req.body);
    //if validation result contain errors
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

    const contact = new Contact(req.body);
    //if no errors, svae in DB
    contact.save((err,contact) => {
        if(err || !contact) {
            return res.status(400).json({
                error : 'Unable to save this contact'
            })
        }
        return res.json({
            message : 'Contact created successfully'
        });
    })
}

//read
exports.getAllContacts = (req,res) => {
    Contact.find().exec((err,contacts) => {
        if(err) {
            return res.json({
                error : 'Unable to fetch contacts from DB'
            })
        }
        return res.json(contacts);
    })
}

