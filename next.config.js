/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next', // Specify the build directory
  target: 'serverless', // Ensure serverless target is set for static export
};

module.exports = nextConfig;
