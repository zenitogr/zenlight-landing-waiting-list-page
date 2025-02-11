const dotenv = require('dotenv');
dotenv.config({ path: './sendgrid.env' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ...existing config... */
};

module.exports = nextConfig;
