const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

    // Add more fields here
    
})

module.exports = mongoose.model('User', UserSchema);