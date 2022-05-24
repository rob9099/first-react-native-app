const mongoose = require('mongoose');

const inProgressSchema = new mongoose.Schema({

    inProgress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('inProgress', inProgressSchema)