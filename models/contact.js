const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const phoneNumberSchema = new Schema({
//     phone : {
//         type : String,
//         required : true,
//         unique : true,  
//     }
// });
// const Phone = mongoose.model('Phone', phoneNumberSchema);

// const emailSchema = new Schema({
//     email : {
//         type : String,
//         required : true,
//         unique : true,  
//     }
// });
// const Email = mongoose.model('Email', phoneNumberSchema);

const contactSchema = new Schema({
    name : {
        type : String,
        required : true,
        maxlength : 32
    },

    //TODO: modify to store multiple emails
    email : {
        type : String,
        required : true,
        unique : true
    },

    //TODO: modify to store multiple phone numbers
    phoneNumber : {
        type : String,
        required : true,
        trim : true,
        unique: true
    },

    dateOfBirth : {
        type : Date
    }
}, 
{timestamps : true}
);
const Contact = mongoose.model('Contact', contactSchema);

module.exports = {
    // Phone,
    // Email,
    Contact
}
