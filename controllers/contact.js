const {Contact} = require('../models/contact');
const {validationResult} = require('express-validator');

//middlewares
exports.getContactById = (req,res, next, id) => {
    Contact.findById(id).exec((err, contact) => {
        if(err || !contact) {
            return res.status(400).json({
                error : 'No such contact found'
            });
        }
        //populate a new object in req object
        req.contact = contact;
        next();
    })
}

//actual routes
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
            message : 'Contact created successfully!'
        });
    })
}

//read
exports.getAllContacts = (req,res) => {
    let sortBy = 'name';
    Contact.find()
      .sort([[sortBy,'asc']])
      .exec((err,contacts) => {
          if(err) {
            return res.status(400).json({
                error : 'Nothing inside contacts list'
            })
          }
          res.json(contacts)
      })
}

//update
exports.updateContact = (req,res) => {
    Contact.findByIdAndUpdate(
        {_id : req.contact._id}, //contact object was populated because of param as middleware
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err,contact) => {
            if(err) {
                return res.status(400).json({
                    error : 'Could not perform this operation'
                })
            }
            return res.json(contact)
        }
    );
}

//delete
exports.deleteContact = (req,res) => {
    const contact = req.contact;

    contact.remove((err,contact) => {
        if(err) {
            return res.status(400).json({
                error : 'Failed to delete contact'
            })
        }
        return res.json({
            message : 'Contact deleted successfully'
        })
    })
}

