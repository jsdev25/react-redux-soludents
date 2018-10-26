const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    dentist_id: {
        type: String,
        required: true
    },
    offer1: {
        type: Boolean,
    },
    offer2: {
        type: Boolean,
    },
    offer3: {
        type: Boolean
    },
    offer4: {
        type: Boolean
    },
    offer5: {
        type: Boolean
    },
    offer6: {
        type: Boolean
    },
    started_date: {
        type: Date,
        default: Date.now
    }
});

const Subscription = mongoose.model('Subscriptions', SubscriptionSchema);

module.exports = Subscription;