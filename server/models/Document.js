const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({

    Filename: {
        type: String,
        //required: true
    },
    directory: {
        type: String,
        //required: true
    },
    dentist_id: {
        type: String,
        required: true
    },
    operator_id: {
        type: String,
        default: 'Not assignment'
    },
    status: {
        type: String,
        default:'In Progress'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date
    }
});

const Document = mongoose.model('Documents', DocumentSchema);

module.exports = Document;