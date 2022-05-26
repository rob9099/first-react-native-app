const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({

    toDo: {
        type: String
    }
});

module.exports = mongoose.model('toDo', toDoSchema)