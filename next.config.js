const dotenv = require('dotenv');
dotenv.config({ path: './sendgrid.env' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },
};

module.exports = nextConfig;
