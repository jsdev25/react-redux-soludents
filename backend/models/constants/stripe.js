const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_VBfOZ0dpLLI1SspuzIr3DbMG'
    : 'sk_test_VBfOZ0dpLLI1SspuzIr3DbMG';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
