const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OperatorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    real_password: {
        type: String,
    }
});

const Operator = mongoose.model('operators', OperatorSchema);

module.exports = Operator;