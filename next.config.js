const path = require('path');

module.exports = {
  images: {
    domains: ['ik.imagekit.io', 'images.ctfassets.net'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
};
