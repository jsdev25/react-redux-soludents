const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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
    },
    avatar: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('admins', AdminSchema);

module.exports = Admin;