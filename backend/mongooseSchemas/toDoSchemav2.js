const mongoose = require('mongoose');

const toDoSchemav2 = new mongoose.Schema({

    value: {
        type: String,
        required: true
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model('toDov2', toDoSchemav2)