/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: false,
  },
  images: {
    domains: [
      'images.prismic.io',
      // Allow Prismic project
      `${process.env.PRISMIC_ENDPOINT.split('/')[2].split('.')[0]}.cdn.prismic.io`,
    ],
  },
};

module.exports = nextConfig;
