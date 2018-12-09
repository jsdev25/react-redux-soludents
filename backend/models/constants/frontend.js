const FRONTEND_DEV_URLS = [ 'https://soludents.com' ];

const FRONTEND_PROD_URLS = [
  'https://soludents.com',
  'http://soludents.com'
];

module.exports = process.env.NODE_ENV === 'production'
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;
