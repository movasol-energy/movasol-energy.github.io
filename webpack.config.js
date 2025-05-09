// webpack.config.js
const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {},               // no JS entry—only assets
  output: {
    path: path.resolve(__dirname, 'docs/assets'),
    filename: '[name].[contenthash].js',  // in case you add JS later
    publicPath: '/assets/',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets/img', to: 'img/[name].[contenthash][ext]' },
        { from: 'assets/css', to: 'css/[name].[contenthash][ext]' },
        { from: 'assets/js',  to: 'js/[name].[contenthash][ext]' },
        // add more patterns as needed
      ],
    }),
    new WebpackManifestPlugin({
      fileName: '../../manifest.json',  // emit at project root next to render.py
      publicPath: '/assets/',
      filter: ({ isInitial, path }) => path !== undefined,
      generate: (seed, files) => {
        const manifest = {};
        files.forEach(file => {
          // map logical name → fingerprinted path
          // e.g. 'img/footer-bg.jpg' → '/assets/img/footer-bg.abc123.jpg'
          const logical = file.name.replace(/\.[0-9a-f]{8,}\./, '.');
          manifest[logical] = file.path;
        });
        return manifest;
      }
    }),
  ],
};
