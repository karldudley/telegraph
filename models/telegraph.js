const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const telegraphSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true});

const Telegraph = mongoose.model('Telegraphs', telegraphSchema)

module.exports = Telegraph;

