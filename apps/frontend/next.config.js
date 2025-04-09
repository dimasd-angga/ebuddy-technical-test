const path = require('path');

const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};