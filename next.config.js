const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://lwdc6kzck0.execute-api.ap-northeast-2.amazonaws.com/:path*',
      },
    ];
  },
};
