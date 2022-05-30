const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({

    value: {
        type: String,
        required: true
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model('toDo', toDoSchema)