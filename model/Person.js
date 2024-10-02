const mongoose = require('mongoose');
const personalbar = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }, mobile: {
        type: String,
        require: true
    }, address: {
        type: String,
        require: true
    }, salary: {
        type: Number,
        require: true
    }
})

//create perosonal model
const Person = mongoose.model("person", personalbar)
module.exports = Person;