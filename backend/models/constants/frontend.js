const FRONTEND_DEV_URLS = ["https://soludents.com"];

const FRONTEND_PROD_URLS = [
  "https://soludents.com",
<<<<<<< HEAD
  "https://soludents.com"
=======
  "https://www.soludents.com"
>>>>>>> a44c9d0dc76d47c1348fdf2fd30a477b73e35e5d
];

module.exports =
  process.env.NODE_ENV === "production"
    ? FRONTEND_PROD_URLS
    : FRONTEND_DEV_URLS;
