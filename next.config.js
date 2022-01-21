const path = require('path');

module.exports = {
  images: {
    domains: ['ik.imagekit.io', 'images.ctfassets.net'],
    loader: 'custom',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
};
