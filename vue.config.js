const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  configureWebpack: {
    entry: './src/main.ts',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.NODE_ENV === 'production' ? 'static' : 'disabled',
        openAnalyzer: false,
      }),
    ],
  },
  devServer: {
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
  },
  productionSourceMap: false,
  css: {
    sourceMap: true,
  },
};
