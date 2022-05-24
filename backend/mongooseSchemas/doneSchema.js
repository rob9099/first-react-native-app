const mongoose = require('mongoose');

const doneSchema = new mongoose.Schema({

    done: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('done', doneSchema)