/* eslint-disable @typescript-eslint/no-var-requires */
const withWorkers = require('@zeit/next-workers');
module.exports = withWorkers({
  webpack(config) {
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: 'worker-loader',
      options: {
        // inline: true,
        name: 'static/[hash].worker.js',
        publicPath: '/_next/',
      },
    });
    // Overcome webpack referencing `window` in chunks
    config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`;
    return config;
  },
});
