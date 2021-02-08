const mongoose = require('mongoose');

const Datum = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    reading: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('datum', Datum)